import { useMemo, useRef } from 'react';

export function useMemoRef<T>(
  factory: () => T,
  inputs: React.InputIdentityList
) {
  const initialValue = useMemo(factory, inputs);
  const ref = useRef(initialValue);

  return ref;
}
