import { newEffect } from 'utils/canvas';
import { declare } from 'utils/DefaultProps';

export const Args = declare(
  class {
    static defaults = {
      spread: 0,
      blur: 1,
      offsetX: 0,
      offsetY: 0,
      color: 'inherit',
    };
  }
);

export const useGlow = Args.wrap(
  args => {
    const { spread, blur, offsetX, offsetY, color } = args;
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
      { inputs: [args], injection: true }
    );
  },
  { hint: 'all props optional' }
);
