import { useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import { getContext } from 'utils/canvas';
import { required, declare } from 'utils/DefaultProps';
import { GoodCanvasChild, GoodCanvasElement } from 'components/GoodCanvas';
import { useMemoRef } from 'utils/CustomHooks';

const Args = declare(
  required<{
    baseScale: d3.ScaleLinear<number, number>;
  }>(),
  required(GoodCanvasChild.propsOut)
);

export const useZoom = Args.wrap(
  ({ baseScale, canvasRef, canvasNeedsUpdate }) => {
    const zoomedScale = baseScale.copy();

    const zoom = useMemo(
      () =>
        d3
          .zoom<typeof GoodCanvasElement.propsOut, any>()
          .scaleExtent([1 / 2, 1]),
      []
    );

    useEffect(() => {
      const { canvas } = getContext(canvasRef);
      const { width, height } = canvas.dims;
      zoom.extent([[0, 0], [width, height]]);
      zoom.translateExtent([
        [-width, 0],
        [width, height],
        // [-20 * diff(baseScale.range() as Pair), 0],
        // [baseScale.range()[1], 0],
      ]);
    }, [canvasNeedsUpdate]);

    useEffect(() => {
      zoom.on('zoom', () => {
        const t = d3.event.transform as ReturnType<typeof d3.zoomTransform>;
        zoomedScale.domain(t.rescaleX(baseScale).domain());
      });

      const { canvas } = getContext(canvasRef);
      d3.select(canvas)
        .call(zoom)
        .on('dblclick.zoom', () => {
          d3.select(canvas)
            .transition()
            .duration(500)
            .call(zoom.transform, d3.zoomIdentity);
        });

      Object.assign(window, { canvas: canvasRef.current });
    }, []);

    return zoomedScale;
  }
);
