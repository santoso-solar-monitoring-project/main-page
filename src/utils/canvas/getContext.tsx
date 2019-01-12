import React from 'react';
import { GoodCanvasType } from 'components/GoodCanvas';
import enhanceContext, { EnhancedContext } from './enhanceContext';

const cache = new Map<
  React.Ref<GoodCanvasType>,
  { canvas: GoodCanvasType; ctx: EnhancedContext }
>();

export default function getContext(canvasRef: React.Ref<GoodCanvasType>) {
  if (!canvasRef) {
    throw Error('`canvasRef` should not be `null`');
  } else if (!('current' in canvasRef)) {
    throw Error(
      'Use a React.RefObject not a functional ref. (`current` member not found in `canvasRef`.)'
    );
  } else if (!canvasRef.current) {
    throw Error('`canvasRef.current` should not be `null`');
  }
  const cached = cache.get(canvasRef);
  if (cached) {
    return cached;
  }
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d')!;
  const enhanced = enhanceContext(ctx);
  const result = { canvas, ctx: enhanced };
  cache.set(canvasRef, result);
  return result;
}
