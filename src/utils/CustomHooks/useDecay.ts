import { useRef } from 'react';
import warn from 'utils/warn';
import { withImm } from 'utils/Imm';

const defaults = {
  minDelta: 10, // ms
  maxDelta: 200, // ms
  halfLife: 250, // ms
};

interface Args extends Partial<typeof defaults> {
  datum: number;
  delta: number; // ms
}

export function useDecay(args: Args) {
  const { datum, delta, minDelta, maxDelta, halfLife } = withImm.mergeFull(
    defaults,
    args
  );
  const signal = useRef(datum);
  const decay = Math.pow(0.5, delta / halfLife);
  if (delta < minDelta) {
  } else if (delta > maxDelta) signal.current = 1000 / delta;
  else signal.current = decay * signal.current + (1 - decay) * datum;
  if (isNaN(signal.current)) {
    warn('Signal was NaN...');
    signal.current = 0;
  }
  return signal.current;
}
