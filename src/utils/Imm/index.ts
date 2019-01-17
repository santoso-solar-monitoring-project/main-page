import _Imm from 'immutable';

export type ImmMapType<M = { [key: string]: any }, K = keyof M> = _Imm.Map<
  K,
  M[keyof M]
>;

export type ImmInnerMapType<T> = T extends ImmMapType<infer Inner>
  ? Inner
  : never;

export type ImmListType<T = any> = _Imm.List<T>;

export type ImmInnerListType<T> = T extends ImmListType<infer Inner>
  ? Inner
  : never;

export { default as makeImmHook } from './makeImmHook';
/* 
https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65
*/
import * as self from '.';
export default Object.assign(_Imm, self);
