import { useMemo } from 'react';
import * as d3 from 'd3';
import { Pair } from 'utils/Pair';
import { evaluate } from 'utils/evaluate';
import { required, defaults } from 'utils/DefaultProps';
import { newEffect, EffectOptions } from 'utils/canvas';
import { REF } from 'utils/easier';

export const Args = EffectOptions.extend(
  required<{ data: REF<Pair[]> }>(),
  defaults({
    // alpha = 0.5 gives centripetal CatmullRom
    line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))' as
      | d3.Line<Pair>
      | string,
  })
);

export const useLine = Args.wrap(({ data, line, ...effectOptions }) => {
  const theLine = useMemo(
    () =>
      (typeof line === 'string' ? evaluate(line, { d3 }) : line) as d3.Line<
        Pair
      >,
    [line]
  );
  return newEffect(ctx => {
    theLine.context(ctx);
    ctx.beginPath();
    theLine(data.current);
    ctx.stroke();
  }, effectOptions);
});
