import React from 'react';
import { fromJS } from '.';
import { ArrayToIntersection } from 'utils/meta';

// Exclude RefObject-type and `children` props from `mergedProps`.
export type DangerousProps<P> = NonNullable<
  {
    [K in keyof P]-?: P[K] extends React.RefObject<any>
      ? K
      : K extends 'children'
      ? K
      : never
  }[keyof P]
>;

// Useful merger to ignore undefined
// Another difference: The merged result excludes properties not originally present in `target`
export function merger<V>(old: V, next: V) {
  return next === undefined ? old : next;
}

export function defaultMerger<V>(_old: V, next: V) {
  return next;
}

// Convenience alias with desireable return type, passing the useful merger
// Another difference: The merged result excludes properties not originally present in `target`
export function merge<T, S>(
  target: T,
  ...sources: S[]
): DangerousProps<T> extends any ? T : never {
  return mergePropsWith(merger, target, ...sources);
}

// Convenience alias with desireable return type
// Another difference: The merged result excludes properties not originally present in `target`
export function mergeProps<T, S>(
  target: T,
  ...sources: S[]
): DangerousProps<T> extends any ? T : never {
  return mergeDeep(target, ...sources);
}

// Convenience alias with desireable return type
// Another difference: The merged result excludes properties not originally present in `target`
export function mergePropsWith<T, S>(
  merger: <K, V>(old: V, next: V, key: K) => V,
  target: T,
  ...sources: S[]
): DangerousProps<T> extends any ? T : never {
  return mergeDeepWith(merger, target, ...sources);
}

// Like Object.assign but deep and does not modify original
// Another difference: The merged result excludes properties not originally present in `target`
export function mergeDeep<T, S>(
  target: T,
  ...sources: S[]
): T & ArrayToIntersection<S[]> {
  return mergeDeepWith(defaultMerger, target, ...sources);
}

// Like Object.assign but deep with custom merge conflict resolver and does not modify original.
// Another difference: The merged result excludes properties not originally present in `target`
export function mergeDeepWith<T, S>(
  merger: <K, V>(old: V, next: V, key: K) => V,
  target: T,
  ...sources: S[]
): T & ArrayToIntersection<S[]> {
  // Only merge in props already present in the target.
  const selection = Object.keys(target);
  sources = sources.map(source =>
    Object.keys(source)
      .filter(key => selection.includes(key))
      .reduce(
        (obj, key) => {
          return {
            ...obj,
            [key]: (source as any)[key],
          };
        },
        {} as S
      )
  );
  return fromJS(target)
    .mergeDeepWith(merger, ...sources)
    .toJS();
}
