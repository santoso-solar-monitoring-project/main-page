import React, { useMemo, SVGAttributes } from 'react';
import * as d3 from 'd3';
import { Pair } from 'utils/Pair';
import { evaluate } from 'utils/evaluate';
import { required, defaults, declare } from 'utils/DefaultProps';
import { animated, OpaqueInterpolation } from 'react-spring';
import { BaseProps } from 'utils/BaseProps';
import { REF } from 'utils/easier';
import { Animatable } from 'react-spring/renderprops';

export const Args = declare(
  required<{ data: REF<Pair[]>; clock: OpaqueInterpolation<number> }>(),
  defaults({
    // alpha = 0.5 gives centripetal CatmullRom
    line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))' as
      | d3.Line<Pair>
      | string,
  }),
  defaults({
    fill: 'transparent',
    stroke: 'hsl(330, 100%, 67%)',
    strokeWidth: 1.5,
  } as Animatable<SVGAttributes<SVGPathElement>>),
  BaseProps
);

export const Line = Args.wrap(({ data, clock, line, ...rest }) => {
  const theLine = useMemo(
    () =>
      (typeof line === 'string' ? evaluate(line, { d3 }) : line) as d3.Line<
        Pair
      >,
    [line]
  );

  return (
    <animated.path
      d={clock.interpolate(() => theLine(data.current) || 'M0,0')}
      {...rest}
    />
  );
});
