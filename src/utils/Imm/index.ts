import Imm from 'immutable';
export { default } from 'immutable';

export type ImmMapType<M = { [key: string]: any }, K = keyof M> = Imm.Map<
  K,
  M[keyof M]
>;

export type ImmInnerMapType<T> = T extends ImmMapType<infer Inner>
  ? Inner
  : never;

export type ImmListType<T = any> = Imm.List<T>;

export type ImmInnerListType<T> = T extends ImmListType<infer Inner>
  ? Inner
  : never;
