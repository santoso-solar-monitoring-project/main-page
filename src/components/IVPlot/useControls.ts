import { useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getContext, newEffect } from 'utils/canvas';
import { required, declare } from 'utils/DefaultProps';
import { GoodCanvasChild, GoodCanvasElement } from 'components/GoodCanvas';
import { withImm, fromJS, ImmMapType, useImm } from 'utils/Imm';
import { Pair } from 'utils/Pair';
import noop from 'utils/noop';
import { REF } from 'utils/easier';
import { diff } from '../../utils/diff';

const Args = declare(
  required<{
    baseScale: d3.ScaleLinear<number, number>;
  }>(),
  required(GoodCanvasChild.propsOut)
);

const slope = (s: d3.ScaleLinear<number, number>) =>
  diff(s.range() as Pair) / diff(s.domain() as Pair);
type Zoom = d3.ZoomBehavior<typeof GoodCanvasElement.propsOut, any>;

export const useControls = Args.wrap(
  ({ baseScale, canvasRef, canvasNeedsUpdate }) => {
    const zoomedScale = baseScale.copy();
    const effect = useRef(noop);

    const zoom: Zoom = useMemo(
      () =>
        d3
          .zoom<typeof GoodCanvasElement.propsOut, any>()
          .scaleExtent([1 / 5, 1]),
      []
    );

    useEffect(() => {
      const { canvas } = getContext(canvasRef);
      const { width, height } = canvas.dims;
      zoom.extent([[0, 0], [width, height]]);
      zoom.translateExtent([
        [-Infinity, 0],
        [width, height],
        // [-20 * diff(baseScale.range() as Pair), 0],
        // [baseScale.range()[1], 0],
      ]);
    }, [canvasNeedsUpdate]);

    useImm(useEffect)(() => {
      const { canvas } = getContext(canvasRef);
      const selection = d3.select(canvas);

      const { onStart, onEnd } = playPause({
        zoom,
        baseScale,
        selection,
        effect,
      });

      zoom
        .on('zoom', () => {
          const t = d3.event.transform as ReturnType<typeof d3.zoomTransform>;
          zoomedScale.domain(t.rescaleX(baseScale).domain());
          Object.assign(window, { zoomedScale });
        })
        .on('start', onStart)
        .on('end', onEnd);
      // TODO: Make onEnd also translate with some momentum

      // TODO: Use zoom.translateTo, zoom.scaleTo, and useSpring to do this without a duration? (Spring transitions between d3.zoomTransform(canvas) and d3.zoomIdentity)
      selection.call(zoom).on('dblclick.zoom', () => {
        selection
          .transition()
          .duration(500)
          .call(zoom.transform, d3.zoomIdentity);
      });

      return () => selection.on('.zoom', null);
    }, [baseScale]);

    Object.assign(window, { canvas: canvasRef.current, zoom, d3 });

    const update = newEffect(() => effect.current());
    return [zoomedScale, update] as [typeof zoomedScale, typeof update];
  }
);

const PlayPauseArgs = required<{
  zoom: Zoom;
  baseScale: d3.ScaleLinear<number, number>;
  selection: d3.Selection<typeof GoodCanvasElement.propsOut, any, any, any>;
  effect: REF<typeof noop>;
}>();

function playPause({
  zoom,
  baseScale,
  selection,
  effect,
}: typeof PlayPauseArgs.propsOut) {
  let start = fromJS({ clientX: 0, clientY: 0 }) as ImmMapType;
  let lastClicked = Date.now();
  let playing = true;

  let at = Date.now();
  const moonWalk = () => {
    const delta = Date.now() - at;
    at += delta;
    const dx = delta * slope(baseScale);
    if (isFinite(dx)) {
      zoom.translateBy(selection, dx, 0);
    }
    Object.assign(window, { at, lastClicked, effect: effect.current });
  };

  function onStart() {
    const e = d3.event;
    if (
      !(
        e.sourceEvent instanceof MouseEvent ||
        e.sourceEvent instanceof TouchEvent
      )
    )
      return;

    const position = {
      clientX: e.sourceEvent.clientX,
      clientY: e.sourceEvent.clientY,
    };
    start = withImm._mergeDeep(start, position);
  }

  function onEnd() {
    const e = d3.event;
    if (
      !(
        e.sourceEvent instanceof MouseEvent ||
        e.sourceEvent instanceof TouchEvent
      )
    )
      return;

    const position = {
      clientX: e.sourceEvent.clientX,
      clientY: e.sourceEvent.clientY,
    };
    const current = withImm._mergeDeep(start, position);

    // Is it a click and not a drag?
    if (current === start) {
      const delta = Date.now() - lastClicked;
      lastClicked += delta;

      if (delta < 250) {
        playing = true;
        effect.current = noop;
        selection.dispatch('dblclick.zoom');
      } else if (playing) {
        playing = false;
        at = lastClicked;
        effect.current = moonWalk;
      } else {
        playing = true;
        effect.current = noop;
      }
    }
  }

  return { onStart, onEnd };
}
