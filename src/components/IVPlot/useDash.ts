import { useAnimationFrame } from './useAnimationFrame';
import { newEffect } from 'utils/canvas';
import { declare, required, defaults } from 'utils/DefaultProps';
import { useSpring } from 'react-spring';

const Args = declare(
  defaults({ period: 300 }), // ms
  required<{ segments: number[] }>()
);

export const useDash = Args.wrap(({ segments, period }) => {
  const total = segments.reduce((a, x) => a + x, 0);

  const { offset } = useSpring({
    to: async next => {
      // while (1) {
      console.log('dash...', offset.value);
      await next({ offset: total });
      // }
    },
    from: { offset: 0 },
    config: { duration: period },
    reset: true,
  });

  return newEffect(
    ctx => {
      ctx.setLineDash(segments);
      ctx.lineDashOffset = offset.value;
    },
    { inputs: [segments] }
  );
});
