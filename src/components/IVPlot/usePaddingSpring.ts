import { useSpring } from 'react-spring';
import { useRef } from 'react';

export function usePaddingSpring<T extends { by: number }>(springProps: T) {
  const immediate = useRef(0);
  const [{ by }, update] = useSpring(() => springProps as { by: number });
  return {
    by,
    update,
    immediate,
  };
}
