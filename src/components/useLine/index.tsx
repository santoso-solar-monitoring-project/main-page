import { useMemo } from 'react';
import * as d3 from 'd3';
import { Pair } from 'utils/Pair';
import { evaluate } from 'utils/evaluate';
import { declare } from 'utils/DefaultProps';
import { newEffect, EffectOptions } from 'utils/canvas';

export const Args = declare(
  class {
    static required: { data: Pair[] };
    static defaults = {
      // alpha = 0.5 gives centripetal CatmullRom
      line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))' as
        | d3.Line<Pair>
        | string,
    };
  },
  EffectOptions
);

export const useLine = Args.wrap(({ data, line, ...effectOptions }) => {
  const theLine = useMemo(
    () => (typeof line === 'string' ? evaluate(line, { d3 }) : line),
    [line]
  );
  return newEffect(ctx => {
    theLine.context(ctx);
    ctx.beginPath();
    theLine(data);
    ctx.stroke();
  }, effectOptions);
});
