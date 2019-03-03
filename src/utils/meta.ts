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
export type ArrayToIntersectionNonNull<T extends any[]> = T extends { 0: any }
  ? ArrayToIntersection<T>
  : {};

// https://stackoverflow.com/a/54010248/3624264
export type Narrowable =
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

export type UndoNarrowable<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends symbol
  ? symbol
  : // : T extends object
  // ? object
  T extends null
  ? null
  : T extends undefined
  ? undefined
  : T extends void
  ? void
  : T extends ((...args: any[]) => any)
  ? ((...args: any[]) => any)
  : // : T extends {}
    // ? {}
    never;

export type Unliterally<T> = {
  [K in keyof T]: T[K] extends object
    ? Unliterally<T[K]>
    : ({ $: T[K] } | UndoNarrowable<T[K]>)
};
// const a = literally({hello:5, world: ['bleh', 'bla']});
// type b = Unliterally<typeof a>
// const c:b = a;

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

/* 
Tuple stuff seems interesting but difficult.
*/
// https://github.com/Microsoft/TypeScript/issues/25947#issuecomment-446916897

// http://developingthoughts.co.uk/typescript-recursive-conditional-types/
/* 
  NonNullableArrays doesn't work... Can't assign NonNullable<T[]> to T[]...
*/
// type AnyFunction = (...args: any[]) => any;
// type TopLevelProperty =
//   | number
//   | string
//   | boolean
//   | symbol
//   | undefined
//   | null
//   | void
//   | AnyFunction
//   | Date;
// export type NonNullableArrays<T> = T extends object ? _NonNullableArrays<T> : T;
// type _NonNullableArrays<T> = {
//   [K in keyof T]: T[K] extends TopLevelProperty
//   ? T[K]
//   : T[K] extends Array<infer U>
//   ? Array<NonNullableArrays<U>>
//   : T[K]
// };
// type aaaa = NonNullableArrays<{ hi: [1, 2, 3, null, 4, [1, 2, null]] }>;

// https://github.com/Microsoft/TypeScript/issues/23199#issuecomment-379323872
export type SelectKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T];

export type FilterOut<T, U = never> = {
  [K in Exclude<keyof T, SelectKeys<T, U>>]: T[K]
};
// type bleh = FilterOut<[1,2,never], never>;

export type Filter<A, B> = A extends B ? A : never;
