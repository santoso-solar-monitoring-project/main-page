import React from 'react';
import { ReactComponent as Lock } from './lock.svg';
export function Login(props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Lock
        style={{
          width: '1em',
          height: '1em',
          fill: 'white',
        }}
      />
      <div style={{ marginLeft: '1ex' }}> Welcome, {props.username}</div>
    </div>
  );
}
