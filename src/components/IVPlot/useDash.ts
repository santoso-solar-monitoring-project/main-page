import { newEffect } from 'utils/canvas';
import { declare, required, defaults } from 'utils/DefaultProps';
import { useRef } from 'react';

const Args = declare(
  defaults({ period: 300 }), // ms
  required<{ segments: number[] }>()
);

export const useDash = Args.wrap(({ segments, period }) => {
  const total = segments.reduce((a, x) => a + x, 0);

  const offset = useRef(0);

  return newEffect(
    ctx => {
      ctx.setLineDash(segments);
      ctx.lineDashOffset = offset.current =
        (offset.current + total * (1000 / 60 / period)) % total;
    },
    { inputs: [segments] }
  );
});
