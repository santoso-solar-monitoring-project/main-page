import React from 'react';
import { GoodCanvasElement } from 'components/GoodCanvas';
import { enhanceContext, EnhancedContext } from '.';
import isValidRefObject from 'utils/isValidRefObject';

type K = GoodCanvasElement;
type V = { canvas: GoodCanvasElement; ctx: EnhancedContext };
const cache = new Map<K, V>();

export type ArgsType = React.Ref<GoodCanvasElement>;

export function getContext(canvasRef: ArgsType) {
  // Throw on bad arguments
  if (
    !isValidRefObject(canvasRef, {
      REF_NULL: '`canvasRef` should not be `null`',
      NO_CURRENT:
        'Use a React.RefObject not a functional ref. (`current` member not found in `canvasRef`.)',
      CURRENT_NULL: '`canvasRef.current` should not be `null`',
    })
  ) {
    // Never reaches here.
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
