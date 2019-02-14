import { useMemoRef } from '.';
import { useRef } from 'react';

export function useFIR(x: number, taps: number[]) {
  const index = useRef(0);

  // buffer signal
  const save = useRef<Float32Array | null>(null);
  const signal = useMemoRef(() => new Float32Array(taps.length));
  save.current = signal.current;

  // append latest data point
  signal.current[index.current] = x;
  index.current = (index.current + 1) % taps.length;

  // generate filtered data point
  const result = signal.current.reduce((acc, e, i) => acc + e * taps[i], 0);
  return result;
}
