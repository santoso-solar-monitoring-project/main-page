import { useRef, useCallback } from 'react';
import { REF } from 'utils/easier';

export function useSilentSwitch(
  initial: boolean = false
): [REF<boolean>, () => boolean] {
  const value = useRef(initial);
  const toggle = useCallback(() => (value.current = !value.current), []);
  return [value, toggle];
}
