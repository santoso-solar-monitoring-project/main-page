import React from 'react';
import { EnhancedContext } from 'utils/canvas';
import { GoodCanvasElement } from 'components/GoodCanvas';

export interface ArgsType {
  canvas: GoodCanvasElement;
  ctx: EnhancedContext;
  delta: number;
}

export type FuncType = (arg: ArgsType) => void;

export type UnsubscribeType = () => void;

export type SubscribeType = (f: FuncType) => UnsubscribeType;

export interface PropsType {
  subscribe: SubscribeType;
}

export interface LoopItemType {
  animate?: FuncType;
}

export interface wire<T> extends React.RefObject<T> {
  readonly current: T;
}

export interface reg<T> extends React.RefObject<T> {
  current: T;
}

export { useAnimationLoop } from './useAnimationLoop';
