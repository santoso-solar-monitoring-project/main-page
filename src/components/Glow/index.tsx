import { newEffect } from 'utils/canvas';
import { defaults } from 'utils/DefaultProps';

export const Args = defaults({
  spread: 0,
  blur: 1,
  offsetX: 0,
  offsetY: 0,
  color: 'inherit',
});

export const useGlow = Args.wrap(
  ({ spread, blur, offsetX, offsetY, color }) => {
    return newEffect(
      ctx => {
        const { lineWidth = 0 } = ctx;
        const existing = ctx.filter === 'none' ? '' : ctx.filter + ' ';
        ctx.filter = existing + `blur(${blur}px)`;
        ctx.translate(offsetX, offsetY);
        ctx.lineWidth += lineWidth + 2 * spread;
        if (color !== 'inherit') {
          ctx.fillStyle = color;
          ctx.strokeStyle = color;
        }
      },
      { injection: true }
    );
  }
);
