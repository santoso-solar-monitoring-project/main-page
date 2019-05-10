import React, { SVGAttributes, useState, useEffect, useRef } from 'react';
import pusher from 'components/Pusher';
import { required } from 'utils/DefaultProps';
import { Pair } from 'utils/Pair';
import {
  useSpring,
  animated,
  config,
  interpolate,
  OpaqueInterpolation,
} from 'react-spring';
import { LOG } from 'components/IVPlot/LOG';
import clamp from 'utils/clamp';

const Args = required<SVGAttributes<SVGElement>>().extend(
  required<{
    panelIdx: number;
  }>()
);

const average = (x: Pair[]) =>
  x.reduce((a, v) => a + v[1], 0) / (x.length || 1);

const CirclePlot = Args.wrap(props => {
  const [{ power }, set] = useSpring(() => ({
    power: 0,
    // config: config.slow,
    immediate: true,
  }));
  const voltage = useRef(0);
  const current = useRef(0);

  const { panelIdx, ...rest } = props;
  (window as any).p = pusher;
  const timeout = useRef(NaN);
  useEffect(() => {
    // clear after a minute of no pusher activity;
    const refresh = () => {
      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = +window.setTimeout(() => {
        voltage.current = current.current = 0;
        set({ power: 0 });
        timeout.current = NaN;
      }, 10e3);
    };
    refresh();
    const voltageChannel = pusher.channels.channels['ch' + 2 * panelIdx];
    voltageChannel.bind('new-data', ({ payload }: { payload: Pair[] }) => {
      voltage.current = average(payload);
      set({
        power:
          (power.value * 0.9) / 60 +
          (0.1 / 60) * current.current * voltage.current,
      });
      refresh();
    });

    const currentChannel = pusher.channels.channels['ch' + (2 * panelIdx + 1)];
    if (!currentChannel) return;
    currentChannel.bind('new-data', ({ payload }: { payload: Pair[] }) => {
      current.current = average(payload);
      set({ power: current.current * voltage.current });
      refresh();
    });
  }, []);
  const progress = power.interpolate(x =>
    clamp(x / 48, [0, 1])
  ) as OpaqueInterpolation<number>;
  const C = Math.PI * 2 * 49;
  return (
    <svg viewBox='0 0 100 100' {...rest}>
      <circle
        cx='50'
        cy='50'
        r='49.875'
        fill='transparent'
        stroke='#1a1a1a'
        strokeWidth='.25'
      />
      <g transform={`translate(50 50) scale(${46.75 / 50}) translate(-50 -50)`}>
        <circle
          cx='50'
          cy='50'
          r='45'
          fill='transparent'
          stroke='#222'
          strokeWidth='3'
          strokeDasharray='1 2'
        />
        <circle
          cx='50'
          cy='50'
          r='49'
          fill='transparent'
          stroke='#222'
          strokeWidth='2'
        />
        <animated.circle
          cx='50'
          cy='50'
          r='49'
          fill='transparent'
          stroke='green'
          strokeWidth='2'
          // strokeLinecap='round'
          strokeDasharray={`${C} ${C}`}
          strokeDashoffset={progress.interpolate(v => (1 - v) * C)}
          transform='rotate(-90 50 50)'
        />
        <text
          x='50'
          y='45'
          fill='white'
          style={{ fontFamily: 'ubuntu mono, monospace' }}
          fontSize='40'
        >
          <animated.tspan textAnchor='middle' alignmentBaseline='middle'>
            {progress.interpolate(v => (v * 100).toFixed(0))}
          </animated.tspan>
          <tspan alignmentBaseline='baseline' fontSize='15' dy='-5'>
            %
          </tspan>
          <tspan
            x='50'
            y='72.5'
            fontSize='10'
            textAnchor='middle'
            alignmentBaseline='middle'
          >
            MAX
          </tspan>
        </text>
      </g>
    </svg>
  );
});

export default CirclePlot;
