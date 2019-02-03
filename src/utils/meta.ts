// https://stackoverflow.com/a/48216010/3624264
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// https://stackoverflow.com/a/49579497/3624264
export type OptionalKeys<T> = NonNullable<
  { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never }[keyof T]
>;
export type OptionalOnly<T> = Pick<T, OptionalKeys<T>>;
export type RequiredOnly<T> = Omit<T, OptionalKeys<T>>;

export type PrettyPrint<T, U, Message> = [T] extends [U] ? Message : T;

// https://stackoverflow.com/a/51604379/3624264
export type ArrayToBoxedUnion<T extends any[]> = {
  [P in keyof T]: [T[P]]
}[Exclude<keyof T, keyof any[]>];
export type UnionToIntersect<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;
export type UnboxIntersect<I> = I extends { 0: infer T } ? T : never;
export type ArrayToIntersection<T extends any[]> = UnboxIntersect<
  UnionToIntersect<ArrayToBoxedUnion<T>>
>;

// https://stackoverflow.com/a/54010248/3624264
type Narrowable =
  | string
  | number
  | boolean
  | symbol
  | object
  | null
  | undefined
  | void
  | ((...args: any[]) => any)
  | {};
export const literally = <
  T extends { [k: string]: V | T } | Array<{ [k: string]: V | T }>,
  V extends Narrowable
>(
  t: T
) => t;

export type Extends<A, B, C = true, D = false> = [A] extends [B] ? C : D;
export type Equals<A, B, C = true, D = false> = Extends<
  C,
  Extends<A, B, C, D> & Extends<B, A, C, D>,
  C,
  D
>;

// Test cases:
// type aaaaa = Equals<2|number, number>
// type AAAAA = Equals<string|number, number>
// type bbbbb = Extends<never, any>
// type BBBBB = Extends<any, never>
// type ccccc = Extends<string, number|string>
// type CCCCC = Extends<number|string, string>
