import React, { useState, useEffect } from 'react';
import { Wifi } from './Wifi';
import { Time } from './Time';
import { Login } from './Login';
const TitleBar = props => {
  const [state, setState] = useState({ level: 0, username: 'DoctorSantoso' });
  useEffect(() => {
    let count = 0;
    const animate = () => {
      count++;
      setState(({ level, username }) => {
        return {
          level: Math.round(Math.random() * 5),
          username:
            count % 4 === 0 ? username.slice(1) + username[0] : username,
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
        font: '1em monospace',
        lineHeight: '1.25em',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2ex',
        paddingRight: '2ex',
      }}
    >
      <Wifi level={state.level} />
      <Time />
      <Login username={state.username} />
    </div>
  );
};

export default TitleBar;
