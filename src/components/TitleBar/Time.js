import React, { useState, useEffect } from 'react';

export function Time() {
  const [, setState] = useState(null);
  useEffect(() => {
    const animate = () => {
      setState(() => null);
      requestAnimationFrame(animate);
    };
    let id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);
  return <div>{new Date().toLocaleTimeString()}</div>;
}
