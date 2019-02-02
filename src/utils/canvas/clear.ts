import { GoodCanvasElement } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { CREF } from 'utils/easy';

export function clear(canvasRef: CREF<typeof GoodCanvasElement.propsOut>) {
  if (canvasRef.current) {
    const { canvas, ctx } = getContext(canvasRef);
    ctx.clearRect(0, 0, canvas.dims.width, canvas.dims.height);
  }
}
