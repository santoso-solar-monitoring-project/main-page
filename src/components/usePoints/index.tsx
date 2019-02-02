import { GoodCanvasChild } from 'components/GoodCanvas';
import { Pair } from 'utils/Pair';
import { declare } from 'utils/DefaultProps';
import { getContext } from 'utils/canvas';

export const Args = declare(
  class {
    static defaults = {
      data: [] as Pair[],
      radius: 3,
      canvasStyle: {
        fillStyle: 'hsl(330, 100%, 75%)',
        strokeStyle: 'hsl(330, 100%, 50%)',
        lineWidth: 0.5,
      } as typeof GoodCanvasChild.Props.propsOut.canvasStyle,
    };
  },
  GoodCanvasChild.Props
);

/* 
{
  offsetX: 0,
  offsetY: 0,
  blurRadius: 5,
  spreadRadius: 0.5,
  // use alpha = 0.5 for light-mode
  color: 'hsl(330, 100%, 50%)',
}
*/
function usePoints(args: typeof Args.propsOut) {
  const { data, radius, canvasRef, canvasStyle, canvasEffects } = args;

  if (canvasRef.current) {
    const { ctx } = getContext(canvasRef);
    ctx.isolate(() => {
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
      // draw points
      for (const [x, y] of data || []) {
        ctx.beginPath();
        ctx.arc(x, y, radius!, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    });
  }
}

export default Args.wrap(usePoints);
