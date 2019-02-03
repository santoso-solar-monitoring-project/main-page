export { enhanceContext, testIt } from './enhanceContext';
export { getContext } from './getContext';
export { scaleCanvas } from './scaleCanvas';
export { clear } from './clear';
export { EffectOptions, newEffect } from './newEffect';
import { CanvasEffect as _CanvasEffect } from './newEffect';
export type CanvasEffect = _CanvasEffect;

import {
  EnhancedContext as _EnhancedContext,
  RelativeCoordinate as _RelativeCoordinate,
  RelativeCoordinates as _RelativeCoordinates,
} from './EnhancedContext';
export type EnhancedContext = _EnhancedContext;
export type RelativeCoordinate = _RelativeCoordinate;
export type RelativeCoordinates = _RelativeCoordinates;
