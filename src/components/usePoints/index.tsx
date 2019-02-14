import { Pair } from 'utils/Pair';
import { declare } from 'utils/DefaultProps';
import { newEffect, EffectOptions, CanvasStyle } from 'utils/canvas';

export const Args = declare(
  class {
    static defaults = {
      data: [] as Pair[],
      radius: 3,
      style: {
        fillStyle: 'hsl(330, 100%, 75%)',
        strokeStyle: 'hsl(330, 100%, 50%)',
        lineWidth: 0.5,
      } as CanvasStyle,
    };
  },
  EffectOptions
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
export const usePoints = Args.wrap(({ data, radius, ...effectOptions }) =>
  newEffect(ctx => {
    for (const [x, y] of data || []) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }, effectOptions)
);
