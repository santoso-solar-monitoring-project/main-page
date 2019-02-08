import React from 'react';
export const Wifi = props => {
  const bars = [
    null,
    <path d="M 12 18 C 11.5 18 10.992188 18.199219 10.59375 18.5 L 12 20 L 13.40625 18.5 C 13.007813 18.199219 12.5 18 12 18 Z" />,
    <path d="M 12 13 C 10.148438 13 8.484375 13.726563 7.21875 14.875 L 8.5625 16.34375 C 9.496094 15.492188 10.648438 15 12 15 C 13.351563 15 14.503906 15.492188 15.4375 16.34375 L 16.78125 14.875 C 15.515625 13.726563 13.851563 13 12 13 Z " />,
    <path d="M 12 8 C 8.847656 8 5.988281 9.214844 3.8125 11.28125 L 5.1875 12.71875 C 7.011719 10.984375 9.351563 10 12 10 C 14.625 10 17 11.089844 18.84375 12.75 L 20.15625 11.25 C 18 9.308594 15.175781 8 12 8 Z " />,
    <path d="M 12 3 C 7.546875 3 3.398438 4.707031 0.40625 7.59375 L 1.78125 9.03125 C 4.390625 6.515625 8.054688 5 12 5 C 15.945313 5 19.492188 6.492188 22.21875 9.03125 L 23.59375 7.5625 C 20.519531 4.699219 16.453125 3 12 3 Z " />,
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        style={{
          width: '1em',
          height: '1em',
          fill: 'white',
        }}
      >
        {React.Children.map(bars, (e, i) => {
          if (!React.isValidElement(e)) return;
          const opacity = i <= props.level ? 1 : 0.3;
          return React.cloneElement(e, { style: { opacity } });
        })}
      </svg>
      <div style={{ marginLeft: '1ex' }}>utexas</div>
    </div>
  );
};
