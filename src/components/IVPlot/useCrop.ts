import { newEffect } from 'utils/canvas';
import { declare } from 'utils/DefaultProps';

const Args = declare(
  class {
    static defaults = {
      // fraction of
      width: 0,
      // plus fraction of
      height: 0.05,
    };
  }
);

export const useCrop = Args.wrap(
  clip => {
    return newEffect(ctx => {
      const { width, height } = ctx;
      const clipBy = ctx.deriveCoordinate(clip);
      ctx.beginPath();
      ctx.rect(clipBy, 0, width - 2 * clipBy, height);
      ctx.clip();
    });
  },
  { hint: 'all props optional' }
);
