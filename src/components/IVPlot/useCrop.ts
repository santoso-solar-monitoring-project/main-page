import { newEffect } from 'utils/canvas';
import { defaults } from 'utils/DefaultProps';
import { RelativeCoordinate } from 'utils/canvas/EnhancedContext';

const Args = defaults({
  by: {
    width: 0,
    height: 0.05,
  } as RelativeCoordinate,
  invert: false,
});

export const useClip = Args.wrap(({ invert, by }) => {
  return newEffect(ctx => {
    const { width, height } = ctx;
    const clipBy = ctx.deriveCoordinate(by);
    const region = new Path2D();
    ctx.beginPath();
    region.rect(clipBy, 0, width - 2 * clipBy, height);
    if (invert) {
      region.rect(0, 0, width, height);
    }
    ctx.clip(region, 'evenodd');
  });
});
