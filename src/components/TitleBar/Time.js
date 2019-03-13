import React from 'react';
import { useAnimationClock } from '../IVPlot/useAnimationClock';
import { animated } from 'react-spring';
export function Time() {
  const clock = useAnimationClock();
  return (
    <animated.div
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {clock.interpolate(() => new Date().toLocaleTimeString())}
    </animated.div>
  );
}
