import React from 'react';
export function Energy(props) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ marginLeft: '1ex' }}>
        {' '}
        Energy generated today: {props.energy} kWh
      </div>
    </div>
  );
}
