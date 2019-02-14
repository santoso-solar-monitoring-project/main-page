import { useRef } from 'react';
import warn from 'utils/warn';
import { declare } from 'utils/DefaultProps';

export const Args = declare(
  class {
    static required: {
      datum: number;
      delta: number; // ms
    };
    static defaults = {
      minDelta: 10, // ms
      maxDelta: Infinity, // ms
      halfLife: 250, // ms
    };
  }
);

export const useDecay = Args.wrap(
  ({ datum, delta, minDelta, maxDelta, halfLife }) => {
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
);
