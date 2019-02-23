import { Pair } from 'utils/Pair';
import { defaults, required } from 'utils/DefaultProps';
import { newEffect, EffectOptions, CanvasStyle } from 'utils/canvas';
import { REF } from 'utils/easier';

export const Args = EffectOptions.extend(
  required<{ data: REF<Pair[]> }>(),
  defaults({
    radius: 3,
    style: {
      fillStyle: 'hsl(330, 100%, 75%)',
      strokeStyle: 'hsl(330, 100%, 50%)',
      lineWidth: 0.5,
    } as CanvasStyle,
  })
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
    for (const [x, y] of data.current) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  }, effectOptions)
);
