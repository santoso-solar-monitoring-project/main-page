import React from 'react';
import { EnhancedContext } from 'utils/canvas';
import { GoodCanvasElement } from 'components/GoodCanvas';

export interface AnimateArgs {
  canvas: GoodCanvasElement;
  ctx: EnhancedContext;
  delta: number;
}

export type Animate = (arg: AnimateArgs) => void;

export type Unsubscribe = () => void;

export type Subscribe = (f: Animate) => Unsubscribe;

export interface Props {
  subscribe: Subscribe;
}

export interface AnimationLoopItem {
  animate?: Animate;
}

export interface Wire<T> extends React.RefObject<T> {
  readonly current: T;
}

export interface Reg<T> extends React.RefObject<T> {
  current: T;
}

export { useAnimationLoop } from './useAnimationLoop';
