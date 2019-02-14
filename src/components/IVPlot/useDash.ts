import { useAnimationFrame } from './useAnimationFrame';
import { newEffect } from 'utils/canvas';
import { declare } from 'utils/DefaultProps';

const Args = declare(
  class {
    static required: { segments: number[] };
    static defaults = { speed: 1 };
  }
);

export const useDash = Args.wrap(({ segments, speed }) => {
  const total = segments.reduce((a, x) => a + x, 0);
  let offset = 0;
  useAnimationFrame(
    () => {
      offset = (offset + speed) % total;
    },
    { silent: true }
  );
  return newEffect(
    ctx => {
      ctx.setLineDash(segments);
      ctx.lineDashOffset = offset;
    },
    { inputs: [segments] }
  );
});
