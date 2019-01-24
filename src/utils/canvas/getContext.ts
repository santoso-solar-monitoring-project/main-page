import React from 'react';
import { GoodCanvasElement } from 'components/GoodCanvas';
import { enhanceContext, EnhancedContext } from '.';
import { isValidGoodCanvas } from './isValidGoodCanvas';

type K = GoodCanvasElement;
type V = { canvas: GoodCanvasElement; ctx: EnhancedContext };
const cache = new Map<K, V>();

export function getContext(canvasRef: React.Ref<GoodCanvasElement>) {
  // Throw on bad GoodCanvas
  if (!isValidGoodCanvas(canvasRef)) {
    // Not reached
    throw Error();
  }

  // Return a previous enhanced canvas context from cache
  const cached = cache.get(canvasRef.current!);
  if (cached) {
    return cached;
  }

  // Get the canvas context and enhance to track `currentTransform` property
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext('2d')!;
  const enhanced = enhanceContext(ctx);
  const result = { canvas, ctx: enhanced };

  // Cache the enhanced canvas context
  cache.set(canvasRef.current!, result);

  return result;
}
