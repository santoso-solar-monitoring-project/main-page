import { useMemo, useEffect } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { getContext, RelativeCoordinates } from 'utils/canvas';
import * as d3 from 'd3';
import { required, declare } from 'utils/DefaultProps';

const Args = declare(
  required<{
    padding: RelativeCoordinates;
  }>(),
  required(GoodCanvasChild.propsOut)
);

export const useScalesXY = Args.wrap(
  ({ canvasRef, canvasNeedsUpdate, padding }) => {
    const [scaleX, scaleY] = useMemo(
      () => [d3.scaleLinear(), d3.scaleLinear()],
      []
    );

    // initialize axes scales
    useEffect(() => {
      const { canvas, ctx } = getContext(canvasRef);
      const { width, height } = canvas.dims;
      const { x: padX, y: padY } = ctx.deriveCoordinates(padding);
      scaleX.range([padX, width - padX]);
      scaleY.range([padY, height - padY]);
    }, [canvasNeedsUpdate]);

    return [scaleX, scaleY];
  }
);
