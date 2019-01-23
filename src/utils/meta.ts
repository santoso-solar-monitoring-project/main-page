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
type Boxed<T extends any[]> = { [P in keyof T]: [T[P]] }[Exclude<
  keyof T,
  keyof any[]
>];
type UnionToIntersect<U> = (U extends any ? (k: U) => void : never) extends ((
  k: infer I
) => void)
  ? I
  : never;
type UnboxIntersect<I> = I extends { 0: infer T } ? T : never;

export type ArrayToIntersection<T extends any[]> = UnboxIntersect<
  UnionToIntersect<Boxed<T>>
>;
