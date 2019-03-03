import React, { SVGAttributes } from 'react';
import { declare, required, defaults } from 'utils/DefaultProps';
import * as d3 from 'd3';
import { diff } from 'utils/diff';
import { Pair } from 'utils/Pair';
import clamp from 'utils/clamp';
import { REF } from 'utils/easier';
import { OpaqueInterpolation, animated } from 'react-spring';

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

const blank = new Date(0);

export const Ticks = Args.wrap(
  ({ clock, scale, timespan, dims, count, textStyle, lineStyle }) => {
    const currentScale = d3.scaleTime();
    const format = currentScale.tickFormat();

    const data = clock.interpolate(() => {
      currentScale.domain(scale.domain()).range(scale.range());
      const span = diff(currentScale.domain() as Pair<Date>, x => x.getTime());
      const every = clamp(span / timespan.current, [1]);
      const ticks = currentScale.ticks(d3.timeSecond.every(every)!);
      const gap = diff(ticks.slice(0, 2) as Pair<Date>, currentScale);
      const pad = clamp(0.05 * gap, [1]);

      const height = dims.current.height;
      Object.assign(window, { it: height, currentScale, ticks });

      return [...Array(count)].map((_, i) => {
        const tick = ticks[i] || blank;
        const t = currentScale(tick);
        return {
          g: { transform: `translate(${t},0)`, visibility: +(tick !== blank) },
          text: {
            x: pad,
            y: height - pad,
            children: format(tick),
          },
        };
      });
    });

    console.log(count);
    Object.assign(window, { count });
    // return null;
    return (
      <animated.g>
        {[...Array(count)].map((_, i) => {
          const item = data.interpolate(d => d[i]);
          return (
            <animated.g
              key={i}
              transform={item.interpolate(d => d.g.transform)}
              visibility={item.interpolate(d => d.g.visibility)}
            >
              <animated.line
                y2={clock.interpolate(() => dims.current.height)}
                {...lineStyle}
              />
              <animated.text
                x={item.interpolate(d => d.text.x)}
                y={item.interpolate(d => d.text.y)}
                {...textStyle}
              >
                {item.interpolate(d => d.text.children)}
              </animated.text>
            </animated.g>
          );
        })}
      </animated.g>
    );
  }
);
