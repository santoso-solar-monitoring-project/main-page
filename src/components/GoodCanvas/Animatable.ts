import { EnhancedContext } from 'utils/canvas';
import { GoodCanvasElement } from '.';

export interface ArgsType {
  canvas: GoodCanvasElement;
  ctx: EnhancedContext;
  delta: number;
}

export type FuncType = (arg: ArgsType) => void;

export type UnsubscribeType = () => void;

export interface PropsType {
  subscribe: (f: FuncType) => UnsubscribeType;
}
