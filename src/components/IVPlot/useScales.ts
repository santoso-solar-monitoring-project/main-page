import { useMemo, useEffect } from 'react';
import { GoodCanvasElement } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import * as d3 from 'd3';
import { CREF } from 'utils/easy';

export function useScalesXY(
  canvasRef: CREF<typeof GoodCanvasElement.propsOut>,
  canvasNeedsUpdate: number,
  padX: number,
  padY: number
) {
  const [scaleX, scaleY] = useMemo(
    () => [d3.scaleLinear(), d3.scaleLinear()],
    []
  );
  // initialize axes scales
  useEffect(
    () => {
      const { canvas } = getContext(canvasRef);
      const { width, height } = canvas.dims;
      scaleX.range([(0 + padX) * width, (1 - padX) * width]);
      scaleY.range([(0 + padY) * height, (1 - padY) * height]);
    },
    [canvasNeedsUpdate]
  );
  return [scaleX, scaleY];
}
