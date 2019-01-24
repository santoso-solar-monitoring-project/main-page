import { Map, List } from 'immutable';
export * from 'immutable';

export type ImmMapType<M extends {} = {}, K = keyof M> = Map<K, M[keyof M]>;
export type ImmInnerMapType<T> = T extends ImmMapType<infer Inner>
  ? Inner
  : never;

export type ImmListType<T = any> = List<T>;
export type ImmInnerListType<T> = T extends ImmListType<infer Inner>
  ? Inner
  : never;

import * as withImm from './withImm';
export { withImm };

export { makeImmHook } from './makeImmHook';
export { useImm } from './useImm';
