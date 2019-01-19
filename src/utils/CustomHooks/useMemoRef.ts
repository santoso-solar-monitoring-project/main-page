import { useMemo, useRef } from 'react';

export function useMemoRef<T>(factory: () => T) {
  const initialValue = useMemo(factory, []);
  const ref = useRef(initialValue);

  return ref;
}
