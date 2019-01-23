import React, {
  FunctionComponent as FuncComp,
  RefForwardingComponent as RefComp,
} from 'react';
import { ImmMapType, fromJS } from '.';
import {
  OptionalKeys,
  Omit,
  ArrayToIntersection,
  OptionalOnly,
} from 'utils/meta';

// Exclude RefObject-type and `children` props from `mergedProps`.
export type DangerousProps<P> = NonNullable<
  {
    [K in keyof P]: NonNullable<P[K]> extends React.RefObject<any>
      ? K
      : K extends 'children'
      ? K
      : never
  }[keyof P]
>;

export type MergedProps<P, D = P> =
  // Pick<
  // Required<D>,
  // NonNullable<OptionalKeys<Omit<D, DangerousProps<D>>>>
  // >;
  // Omit<
  //   OptionalOnly<P>,
  //   NonNullable<DangerousProps<P> | Exclude<keyof P, keyof D>>
  // >;
  Omit<Required<P>, DangerousProps<P> | Exclude<keyof P, keyof D>>;

// Functional component
export interface FC<P, D = P> {
  (props: P, mergedProps: MergedProps<P, D>): ReturnType<
    React.FunctionComponent<P>
  >;
}

// RefForwarding component
export interface RFC<P, T, D = P> {
  (
    props: P,
    mergedProps: MergedProps<P, D>,
    ref: React.Ref<T> | null
  ): ReturnType<React.RefForwardingComponent<T, P>>;
}

type SetOptionals<P, D> = Omit<P, keyof D> & Partial<D>;

// Choose decorator overload
class WithImm<D> {
  constructor(private defaultProps: D) {}

  // Typeguard to distinguish between component types
  isFunc<P, T>(f: FC<P> | RFC<P, T>): f is FC<P> {
    return typeof f === 'function' && f.length == 2;
  }
  isRefFunc<P, T>(f: FC<P> | RFC<P, T>): f is RFC<P, T> {
    return typeof f === 'function' && f.length == 3;
  }

  // Don't merge `undefined` values (when explicitly set)
  merger = <V>(oldValue: V, newValue: V) =>
    newValue === undefined ? oldValue : newValue;

  bind<P extends D>(f: FC<SetOptionals<P, D>>): FuncComp<SetOptionals<P, D>>;
  bind<P extends Partial<D>, T>(f: RFC<P, T>): RefComp<T, P>;
  bind<P extends Partial<D>, T>(
    f: FC<P> | RFC<P, T>
  ): FuncComp<P> | RefComp<T, P> {
    // Save Immutable-converted version of defaultProps
    const defaultPropsImm: ImmMapType<P> = mergeDeep(this.defaultProps, {});

    if (this.isFunc<P, T>(f)) {
      // Functional component
      type SafeProps<P> = Omit<P, DangerousProps<P>>;
      const decorated: React.FunctionComponent<P> = props => {
        const mergedProps = mergeDeepWith(
          this.merger,
          // Save a tiny bit of work by reusing an Immutable object
          (defaultPropsImm as any) as P,
          props as SafeProps<P>
        ) as MergedProps<P>;

        return f(props, mergedProps);
      };
      decorated.displayName = f.name;

      return decorated;
    } else {
      // RefForwarding component
      type SafeProps<P> = Omit<P, DangerousProps<P>>;
      const decorated: React.RefForwardingComponent<T, P> = (props, ref) => {
        const mergedProps = mergeDeepWith(
          this.merger,
          // Save a tiny bit of work by reusing an Immutable object
          (defaultPropsImm as any) as P,
          props as SafeProps<P>
        ) as MergedProps<P>;

        return f(props, mergedProps, ref);
      };
      decorated.displayName = f.name;

      return decorated;
    }
  }
}

// Decorator factory
export function bind<D>(defaultProps: D): WithImm<D>['bind'] {
  const resolver = new WithImm(defaultProps);
  return <P extends Partial<D>, T>(f: FC<P> | RFC<P, T>) =>
    resolver.bind<P, T>(f);
}

// Like Object.assign but deep and does not modify original
export function mergeDeep<T, S extends any[]>(
  target: T,
  ...sources: S
): T & ArrayToIntersection<S> {
  return fromJS(target)
    .mergeDeep(...sources)
    .toJS();
}

// Like Object.assign but deep with custom merge conflict resolver and does not modify original
export function mergeDeepWith<T, U extends any[]>(
  merger: <K, V>(oldValue: V, newValue: V, key: K) => V,
  target: T,
  ...sources: U
): T & ArrayToIntersection<U> {
  return fromJS(target)
    .mergeDeepWith(merger, ...sources)
    .toJS();
}

// Example usage...
const defaultProps = { hi: 5 };
// IMPORTANT: Only optional properties are added to `mergedProps`
type PropsType = { hi?: number; yes: string };

// RefForwardingComponent, type parameters required
const aaaa = bind(defaultProps)<PropsType, any>(
  (props, mergedProps, ref) => null
);

// FunctionComponent, `typeof props` defaults to same as defaultProps
const bbbb = bind(defaultProps)((props, mergedProps) => {
  type a = OptionalKeys<typeof props>; // "hi"
  props.hi; // (property) hi?: number | undefined
  return null;
});
