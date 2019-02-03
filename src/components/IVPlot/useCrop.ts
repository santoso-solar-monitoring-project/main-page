import { newEffect } from 'utils/canvas';
import { declare } from 'utils/DefaultProps';

const Args = declare(
  class {
    static defaults = {
      // fraction of
      width: 0,
      // plus fraction of
      height: 0.05,
      invert: false,
    };
  }
);

export const useCrop = Args.wrap(
  ({ invert, ...bounds }) => {
    return newEffect(ctx => {
      const { width, height } = ctx;
      const clipBy = ctx.deriveCoordinate(bounds);
      const region = new Path2D();
      ctx.beginPath();
      region.rect(clipBy, 0, width - 2 * clipBy, height);
      if (invert) {
        region.rect(0, 0, width, height);
      }
      ctx.clip(region, 'evenodd');
    });
  },
  { hint: 'all props optional' }
);
