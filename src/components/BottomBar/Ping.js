import React from 'react';
export function Ping(props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ marginLeft: '1ex' }}> Ping: {props.ping}</div>
    </div>
  );
}
