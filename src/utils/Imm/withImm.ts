import { List, fromJS } from 'immutable';
import { ArrayToIntersectionNonNull } from 'utils/meta';

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
export function mergeIntersect<T extends object, S extends any[]>(
  target: T,
  ...sources: S
) {
  return mergeIntersectWith(ignoreUndefined, target, ...sources) as T;
}

// Same as `merge` but allows configuring merge conflict behavior to do something besides ignore `undefined` values in `sources`.
export function mergeIntersectWith<T extends object, S extends any[]>(
  merger: <K, V>(old: V, next: V, key: K) => V,
  target: T,
  ...sources: S
) {
  // Filter out props not already present in `target`.
  const selection = Object.keys(target);
  sources = sources.filter(Boolean).map(source =>
    // Special case for Array objects (preserve its prototype)
    source instanceof Array
      ? source
      : Object.keys(source)
          .filter(key => selection.includes(key))
          .reduce((obj, key) => {
            return {
              ...obj,
              [key]: (source as any)[key],
            };
          }, {})
  ) as S;
  return mergeWith(merger, target, ...sources) as T;
}

// Like `Object.assign` but properties are merged deeply. Sources are copied not modified. Passing no sources will yield an empty object {}.
// Undefined values in `sources` are ignored (do not overwrite values in first source).
// Note: For some reason TypeScript doesn't recognize if you call merge() with both spread and individual arguments.
// For instance `merge(...args, defaultSettings)` does not work!
// My signature is probably at fault but I don't know how to fix it. (2/23/19)
export function merge<T extends any[]>(...sources: T) {
  return mergeWith(ignoreUndefined, ...sources) as {
    [K in keyof ArrayToIntersectionNonNull<T>]: ArrayToIntersectionNonNull<T>[K]
  };
}

// Like `Object.assign` but properties are merged deeply using the custom merge conflict resolver passed. Sources are copied not modified. Passing no sources will yield an empty object {}.
export function mergeWith<T extends any[]>(
  merger: <K, V>(old: V, next: V, key: K) => V,
  ...sources: T
) {
  return _mergeDeepWith(merger, ...sources).toJS() as {
    [K in keyof ArrayToIntersectionNonNull<T>]: ArrayToIntersectionNonNull<T>[K]
  };
}

function isMergeable(a: any): a is { mergeWith: Function } {
  return (
    a &&
    typeof a === 'object' &&
    typeof a.mergeWith === 'function' &&
    !List.isList(a)
  );
}

type Merger = <K, V>(oldVal: V, newVal: V, key?: K) => V;
export function _mergeDeepWith<T extends object[]>(
  merger: Merger,
  ...collections: T
) {
  /* 
  https://github.com/immutable-js/immutable-js/issues/1452#issuecomment-386162309
  */
  const _mergeDeep = <K, V>(a: V, b: V, key?: K): V | List<unknown> => {
    // If b is null, it would overwrite a, even if a is mergeable
    if (isMergeable(a) && b !== null) {
      return a.mergeWith(_mergeDeep, b);
    }

    if (!List.isList(a) || !List.isList(b)) {
      return merger(a, b, key);
    }

    return (b as List<unknown>).reduce(
      (acc, nextItem, index) => {
        const existingItem = acc.get(index);
        if (isMergeable(existingItem)) {
          return acc.set(index, existingItem.mergeWith(_mergeDeep, nextItem));
        }

        return acc.set(index, merger(existingItem, nextItem, index));
      },
      a as List<unknown>
    );
  };

  return collections
    .slice(1)
    .reduce(
      (acc, x) => _mergeDeep(acc, fromJS(x)),
      fromJS(collections[0] != null ? collections[0] : {})
    );
}

export function _mergeDeep<T extends object[]>(...collections: T) {
  return _mergeDeepWith(defaultMerger, ...collections);
}

// Example use:
const aaaaa = { hello: 3, canvasStyle: [1, 2, 3], canvasEffects: () => {} };
const bbbbb = { hello: 'world', canvasStyle: [3, , 1], poop: 'hiii' };
const ccccc = merge(aaaaa, bbbbb);
const ddddd = merge(...([aaaaa, bbbbb] as [typeof aaaaa, typeof bbbbb]));
// const ccccc = merge();
// console.log(ccccc);

// Object.assign(window, {
//   List,
//   fromJS,
//   _mergeDeepWith,
//   _mergeDeep,
//   merge,
//   aaaaa,
//   bbbbb,
//   ccccc,
// });
