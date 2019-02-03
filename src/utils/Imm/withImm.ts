import React from 'react';
import { mapFromJS } from '.';
import { ArrayToIntersection } from 'utils/meta';

// Useful merger to ignore undefined
// Another difference: The merged result excludes properties not originally present in `target`
export function ignoreUndefined<V>(old: V, next: V) {
  return next === undefined ? old : next;
}

export function defaultMerger<V>(_old: V, next: V) {
  return next;
}

// Overwrite properties in `target` from `sources`.
// Does not add new properties not originally in `target`.
// Undefined values in `sources` are ignored (do not overwrite `target` values).
// Excludes dangerous React props.
export function merge<T, S extends any[]>(target: T, ...sources: S): T {
  return mergeWith(ignoreUndefined, target, ...sources);
}

// Same as `merge` but allows configuring merge conflict behavior to do something besides ignore `undefined` values in `sources`.
export function mergeWith<T, S extends any[]>(
  merger: <K, V>(old: V, next: V, key: K) => V,
  target: T,
  ...sources: S
): T {
  // Filter out props not already present in `target`.
  const selection = Object.keys(target);
  sources = sources.filter(Boolean).map(source =>
    Object.keys(source)
      .filter(key => selection.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: (source as any)[key],
        };
      }, {})
  ) as S;
  return mergeFullWith(merger, target, ...sources);
}

// Like `Object.assign` but properties are merged deeply and a new object is created instead of modifying the `target`.
// Undefined values in `sources` are ignored (do not overwrite `target` values).
export function mergeFull<S extends any[]>(
  ...sources: S
): ArrayToIntersection<S> {
  return mergeFullWith(ignoreUndefined, ...sources);
}

// Like `Object.assign` but properties are merged deeply with custom merge conflict resolver and a new object is created instead of modifying the `target`.
export function mergeFullWith<S extends any[]>(
  merger: <K, V>(old: V, next: V, key: K) => V,
  ...sources: S
): ArrayToIntersection<S> {
  return mapFromJS({})
    .mergeDeepWith(merger, ...sources)
    .toJS() as ArrayToIntersection<S>;
}

// Example use:
// const a = {radius: 5};
// const b = {canvasStyle: [1,2,3], canvasEffects: ()=>{}};
// const c = mergeDeep(a, b, {hello: 'world', canvasStyle: 3});
// type d<T> = T extends number ? 'yes' : 'no';
// type e = d<typeof c.canvasStyle>

// Example use:
// import { UnionToIntersect } from 'utils/meta';
// const f = (a: { radius: number }) => {};
// const g = (a: {
//   canvasStyle: [number, number, number];
//   canvasEffects?: () => void;
// }) => {};
// // const h = mergeDeep(f, g);
// type i<T> = T extends any ? Parameters<T>[0] : T;
// type j = UnionToIntersect<i<typeof f | typeof g>>; // typeof h doesn't work
// const k = (a: j) => {};
// const l = k({ radius: 5, canvasStyle: [3, 2, 1] });
