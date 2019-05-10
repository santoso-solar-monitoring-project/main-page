import React from 'react';
export function FPS(props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ marginLeft: '1ex' }}> FPS: {props.fps}</div>
    </div>
  );
}
