import React, { useMemo, SVGAttributes } from 'react';
import * as d3 from 'd3';
import { Pair } from 'utils/Pair';
import { evaluate } from 'utils/evaluate';
import { required, defaults, declare } from 'utils/DefaultProps';
import { animated, AnimatedValue } from 'react-spring';
import { BaseProps } from 'utils/BaseProps';

export const Args = declare(
  required<{ data: AnimatedValue<Pair[]> }>(),
  defaults({
    // alpha = 0.5 gives centripetal CatmullRom
    line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))' as
      | d3.Line<Pair>
      | string,
    fill: 'transparent',
  }),
  required<SVGAttributes<SVGPathElement>>(),
  BaseProps
);

export const Line = Args.wrap(({ data, line, ...rest }) => {
  const theLine = useMemo(
    () =>
      (typeof line === 'string' ? evaluate(line, { d3 }) : line) as d3.Line<
        Pair
      >,
    [line]
  );

  return (
    <animated.path d={data.interpolate(x => theLine(x) || '')} {...rest} />
  );
});
