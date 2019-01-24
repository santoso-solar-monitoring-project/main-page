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
export type ArrayToUnion<T extends any[]> = { [P in keyof T]: T[P] }[Exclude<
  keyof T,
  keyof any[]
>];
export type UnionToIntersect<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;
export type UnboxIntersect<I> = I extends { 0: infer T } ? T : never;
export type ArrayToIntersection<T extends any[]> = UnboxIntersect<
  UnionToIntersect<ArrayToBoxedUnion<T>>
>;

export type EntriesArrayToUnion<
  E extends ([K, V])[],
  K = string | number | symbol,
  V = any
> = { [x in keyof E]: E[x] }[Exclude<keyof E, keyof any[]>];
export type EntriesToSingletons<E> = E extends { 0: infer K; 1: infer V }
  ? K extends string | number | symbol
    ? { [x in K]: V }
    : never
  : never;
export type EntriesToObject<
  E extends ([K, V])[],
  K extends string | number | symbol = string | number | symbol,
  V = any
> = UnionToIntersect<EntriesToSingletons<EntriesArrayToUnion<E, K, V>>>;

// type aaaaa = EntriesArrayToUnion<
//   [[2, 1], ['hello', 'world'], ['wow', () => {}]]
// >;
// type bbbbb = EntriesToSingletons<aaaaa>;
// type ccccc = UnionToIntersect<bbbbb>;
// type ddddd = EntriesToObject<[[2, 1], ['hello', 'world'], ['wow', () => {}]]>;
