import React from 'react';
import { Pair } from 'utils/Pair';
import { defaults, required, declare } from 'utils/DefaultProps';
import { REF } from 'utils/easier';
import { animated, OpaqueInterpolation, interpolate } from 'react-spring';
import { SVGAttributes } from 'react';
import { Animatable } from 'react-spring/renderprops';

export const Args = declare(
  required<{
    data: REF<Pair[]>;
    ticks: OpaqueInterpolation<Date[]>;
    ticksScale: d3.ScaleTime<number, number>;
    scaleY: d3.ScaleLinear<number, number>;
    curve: d3.CurveCatmullRomFactory;
    count: number;
  }>(),
  defaults({
    circleStyle: {
      r: 3,
      fill: 'hsl(330, 100%, 75%)',
      stroke: 'hsl(330, 100%, 50%)',
      strokeWidth: 0.5,
    } as Animatable<SVGAttributes<SVGCircleElement>>,
    textStyle: {
      fill: 'hsl(330, 100%, 75%)',
      style: {
        font: '16px ubuntu mono, monospace',
      },
    } as Animatable<SVGAttributes<SVGTextElement>>,
  }),
  required<Animatable<SVGAttributes<SVGGElement>>>()
);

/* 
{
offsetX: 0,
offsetY: 0,
blurRadius: 5,
spreadRadius: 0.5,
// use alpha = 0.5 for light-mode
color: 'hsl(330, 100%, 50%)',
}
*/
export const Points = Args.wrap(
  ({
    ticks,
    ticksScale,
    data,
    count,
    curve,
    scaleY,
    circleStyle,
    textStyle,
    ...rest
  }) => (
    <animated.g {...rest}>
      {[...Array(count)].map((_, i) => {
        // console.log('hiiii', i);
        const tick = ticks.interpolate<Date | 0>(ticks => ticks[i] || 0);
        const x = tick.interpolate(tick => ticksScale(tick));
        const y = x.interpolate(x =>
          x !== 0 && data.current.length
            ? curve.interpolate(x, data.current) || -1
            : -1
        );
        const visibility = y.interpolate<string>(y =>
          y !== -1 ? 'visible' : 'hidden'
        );

        return (
          <animated.g
            key={i}
            visibility={visibility}
            transform={interpolate([x, y], (x, y) => `translate(${x},${y})`)}
          >
            <animated.circle cx={0} cy={0} {...circleStyle} />
            <animated.text x={5} y={4} {...textStyle}>
              {y.interpolate(y => scaleY.invert(y).toFixed(1))}
            </animated.text>
          </animated.g>
        );
      })}
    </animated.g>
  )
);
