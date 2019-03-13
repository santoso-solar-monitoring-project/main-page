import React, { SVGAttributes } from 'react';
import { declare, required, defaults } from 'utils/DefaultProps';
import * as d3 from 'd3';
import { diff } from 'utils/diff';
import { Pair } from 'utils/Pair';
import clamp from 'utils/clamp';
import { REF } from 'utils/easier';
import { OpaqueInterpolation, animated, interpolate } from 'react-spring';

const Args = declare(
  required<{
    clock: OpaqueInterpolation<number>;
    scale: d3.ScaleLinear<number, number>;
    timespan: REF<number>;
    dims: REF<DOMRect>;
    count: number;
  }>(),
  defaults({
    textStyle: {
      fill: '#888',
      style: {
        font: '14px ubuntu mono, monospace',
      },
    } as SVGAttributes<SVGTextElement>,
    lineStyle: {
      stroke: '#444',
    } as SVGAttributes<SVGLineElement>,
  })
);

export const useTicks = Args.wrap(
  ({ clock, scale, timespan, dims, count, textStyle, lineStyle }) => {
    const currentScale = d3.scaleTime();
    const format = currentScale.tickFormat();

    const data = clock.interpolate(() => {
      currentScale.domain(scale.domain()).range(scale.range());
      const span = diff(currentScale.domain() as Pair<Date>, x => x.getTime());
      const every = clamp(span / timespan.current, [1]);
      const ticks = currentScale.ticks(d3.timeSecond.every(every)!);
      const gap = diff(ticks.slice(0, 2) as Pair<Date>, currentScale) || 0;
      const pad = clamp(0.05 * gap, [1]);
      const height = dims.current.height;

      return { ticks, pad, height };
    });

    const Ticks = required<SVGAttributes<SVGGElement>>().wrap(props => (
      <g {...props}>
        {[...Array(count)].map((_, i) => {
          const tick = data.interpolate<Date | 0>(data => data.ticks[i] || 0);
          const t = tick.interpolate(tick => currentScale(tick));
          const height = data.interpolate(data => data.height);
          const pad = data.interpolate(data => data.pad);
          return (
            <animated.g
              key={i}
              transform={t.interpolate(t => `translate(${t},0)`)}
              visibility={tick.interpolate<string>(tick =>
                tick !== 0 ? 'visible' : 'hidden'
              )}
            >
              <animated.line y2={height} {...lineStyle} />
              <animated.text
                x={pad}
                y={interpolate([height, pad], (height, pad) => height - pad)}
                {...textStyle}
              >
                {tick.interpolate(tick => format(tick as Date))}
              </animated.text>
            </animated.g>
          );
        })}
      </g>
    ));

    const ticks = data.interpolate(data => data.ticks);

    return [Ticks, ticks, currentScale] as [
      typeof Ticks,
      typeof ticks,
      typeof currentScale
    ];
  }
);
