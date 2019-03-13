import { useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { required, declare, defaults } from 'utils/DefaultProps';
import { Pair } from 'utils/Pair';
import noop from 'utils/noop';
import { REF, CREF } from 'utils/easier';
import { diff } from '../../utils/diff';

const Args = declare(
  required<{
    scale: d3.ScaleLinear<number, number>;
    svgRef: CREF<SVGSVGElement>;
    dims: REF<{ width: number; height: number }>;
  }>(),
  defaults({
    dblclick: 150, // ms
  })
);

const slope = (s: d3.ScaleLinear<number, number>) =>
  diff(s.range() as Pair) / diff(s.domain() as Pair);
const avg = (values: number[]) =>
  values.length ? values.reduce((a, x) => a + x, 0) / values.length : 0;
type Zoom = d3.ZoomBehavior<SVGSVGElement, any>;

export const useControls = Args.wrap(({ scale, svgRef, dims, dblclick }) => {
  const baseScale = scale.copy();
  const effect = useRef(noop);

  const zoom: Zoom = useMemo(
    () => d3.zoom<SVGSVGElement, any>().scaleExtent([1 / 5, 1]),
    []
  );

  useEffect(() => {
    const width = dims.current.width;
    zoom.extent([[0, 0], [width, 0]]);
    zoom.translateExtent([[-Infinity, 0], [width, 0]]);
    baseScale.domain(scale.domain()).range(scale.range());
  });

  useEffect(() => {
    const selection = d3.select(svgRef.current!);

    zoom
      .on('zoom', () => {
        const t = d3.event.transform as d3.ZoomTransform;
        scale.domain(t.rescaleX(baseScale).domain());
      })
      .duration(dblclick);

    const paused = (at: number) => () => {
      const delta = Date.now() - at;
      at += delta;
      const dx = delta * slope(baseScale);
      zoom.translateBy(selection, dx, 0);
    };
    let clickID = NaN;
    type States = 'unpaused' | 'waiting' | 'paused' | 'cancelling';
    let state: States = 'unpaused';
    const nextState = (s: States) => {
      const prevState = state;
      switch ((state = s)) {
        case 'unpaused': {
          effect.current = noop;
          break;
        }
        case 'waiting': {
          if (prevState === 'waiting') break;
          const from = { unpaused: 'paused', paused: 'unpaused' } as {
            [k: string]: States;
          };
          clickID = window.setTimeout(() => {
            nextState(from[prevState]);
          }, dblclick);
          break;
        }
        case 'paused': {
          effect.current = paused(Date.now());
          break;
        }
        case 'cancelling': {
          window.clearTimeout(clickID);
          break;
        }
      }
    };

    const factor = 0.33; // adjust duration calculated by d3.interpolateZoom
    const reset = () => {
      const t = d3.zoomTransform(svgRef.current!);
      const width = diff(scale.range() as Pair);
      const cx = t.x + width / 2;
      const duration =
        factor *
        d3.interpolateZoom(
          [cx, 0, width],
          [avg(baseScale.range()), 0, diff(baseScale.range() as Pair)]
        ).duration;
      selection
        .transition()
        .duration(duration)
        .call(zoom.transform, d3.zoomIdentity);
    };

    selection
      .call(zoom)
      .on('dblclick.zoom', () => {
        reset();
        nextState('cancelling');
        nextState('unpaused');
      })
      .on('click', () => nextState('waiting'));

    return () => selection.on('.zoom', null);
  });

  const update = () => effect.current();
  return update;
});
