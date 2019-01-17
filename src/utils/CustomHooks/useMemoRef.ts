import { useMemo, useRef } from 'react';

type FactoryType<T> = () => T;
function isFactory<T>(arg: T | FactoryType<T>): arg is FactoryType<T> {
  return typeof arg === 'function';
}

export function useMemoRef<T>(initialValue: T | FactoryType<T>) {
  const factory: FactoryType<T> = isFactory<T>(initialValue)
    ? initialValue
    : () => initialValue;

  const initial = useMemo(factory, []);
  const ref = useRef(initial);

  return ref;
}
