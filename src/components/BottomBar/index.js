import React, { useState, useEffect } from 'react';
import { FPS } from './FPS';
import { Energy } from './Energy';
import { Ping } from './Ping';
const TitleBar = props => {
  const [state, setState] = useState({
    fps: 60,
    ping: '17',
    energy: 250,
  });
  useEffect(() => {
    const animate = () => {
      setState(({ fps, ping, energy }) => {
        return {
          fps: Math.round(Math.random() * 60) + 10,
          ping: Math.round(Math.random() * 60) + 10,
          energy: Math.round(Math.random() * 1000) + 2500,
        };
      });
      requestAnimationFrame(animate);
    };
    let id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      style={{
        lineHeight: '1.25em',
        background: '#ffffff10',
        textTransform: 'uppercase',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2ex',
        paddingRight: '2ex',
      }}
    >
      <FPS fps={state.fps} />
      <Energy energy={state.energy} />
      <Ping ping={state.ping} />
    </div>
  );
};

export default TitleBar;
