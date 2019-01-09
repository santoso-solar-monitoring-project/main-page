import React from 'react';
import { GoodCanvasType } from 'components/GoodCanvas/types.d';

export default function getContext<
  T extends HTMLCanvasElement | GoodCanvasType
>(
  canvasRef: React.RefObject<T> | React.Ref<T>
): { canvas: T; ctx: CanvasRenderingContext2D } {
  if (!canvasRef || !('current' in canvasRef) || !canvasRef.current)
    throw Error('Canvas should not be null');
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}
