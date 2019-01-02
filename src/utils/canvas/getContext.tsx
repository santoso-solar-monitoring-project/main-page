import React from 'react';

export default function getContext(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  // console.assert(!canvasRef.current, 'Canvas should not be null');
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}
