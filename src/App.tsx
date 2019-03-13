import React, { Component, SVGAttributes } from 'react';
import logo from './logo.svg';
import './App.css';
import IVPlot from 'components/IVPlot';
import TitleBar from 'components/TitleBar';
import { useSpring, animated } from 'react-spring';
import { Pair } from 'utils/Pair';

const CircleDumby = (props: SVGAttributes<SVGElement>) => {
  const progress = Math.random() * 0.3 + 0.7;
  const C = Math.PI * 2 * 49;
  const [{ xy }, set] = useSpring(() => ({
    xy: [0, 0] as Pair,
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  const bleh = xy.interpolate(()=>1); // debug this to distinguish derived and underived behavior of unpacking arrays in the interpolator function.
  bleh.interpolate((a:number)=>a)
  const transform = (x: number, y: number) =>
    `translate(calc(${x}px - 50%, calc(${y}px - 50%)))`;
  const transform2 = (what: any) => (console.log(what), '');
  return (
    <svg viewBox='0 0 100 100' {...props}>
      <circle
        cx='50'
        cy='50'
        r='49.875'
        fill='transparent'
        stroke='#1a1a1a'
        strokeWidth='.25'
      />
      <animated.circle
        cx='50'
        cy='50'
        r='49.875'
        fill='#fff3'
        stroke='red'
        strokeWidth='1'
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: [x, y] })}
        style={{
          transform: xy.interpolate(transform2),
          position: 'absolute',
          left: 0,
          top: 0,
        }}
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
        <circle
          cx='50'
          cy='50'
          r='49'
          fill='transparent'
          stroke='green'
          strokeWidth='2'
          // strokeLinecap='round'
          strokeDasharray={`${C} ${C}`}
          strokeDashoffset={(1 - progress) * C}
          transform='rotate(-90 50 50)'
        />
        <text
          x='50'
          y='45'
          fill='white'
          style={{ fontFamily: 'ubuntu mono, monospace' }}
          fontSize='40'
        >
          <tspan textAnchor='middle' alignmentBaseline='middle'>
            {(progress * 100).toFixed(0)}
          </tspan>
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
};

class App extends Component<{}, { bleh: number }> {
  render() {
    return (
      <>
        <TitleBar />
        <div className='main'>
          <div className='row'>
            <CircleDumby height='100%' />
            <IVPlot channelNames={['ch0', 'ch1']} />
          </div>
          <div className='row'>
            <CircleDumby height='100%' />
            <IVPlot channelNames={['ch2', 'ch3']} />
          </div>
          <div className='row'>
            <CircleDumby height='100%' />
            <IVPlot channelNames={['debug', 'debug']} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
