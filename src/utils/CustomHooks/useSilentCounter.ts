import { useRef, useCallback } from 'react';

export function useSilentCounter(initial: number = 0): [number, () => void] {
  const value = useRef(initial);
  const increment = useCallback(() => value.current++, []);
  return [value.current, increment];
}
