import React, { useState } from 'react';
import { Wifi } from './Wifi';
import { Time } from './Time';
import { Login } from './Login';
const TitleBar = () => {
  const [state] = useState({
    level: 4,
    username:
      new URL(document.location).searchParams.get('username') || 'Guest',
  });

  return (
    <div
      style={{
        font: '1em monospace',
        lineHeight: '1.25em',
        backgroundColor: '#222',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2ex',
        paddingRight: '2ex',
        position: 'relative',
      }}
    >
      <Wifi level={state.level} />
      <Time />
      <Login username={state.username} />
    </div>
  );
};

export default TitleBar;
