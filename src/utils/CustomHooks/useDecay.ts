import { useRef } from 'react';
import warn from 'utils/warn';
import { defaults, required } from 'utils/DefaultProps';

const Args = defaults({
  initialValue: 0,
  minDelta: 10, // ms
  maxDelta: Infinity, // ms
  halfLife: 250, // ms
});

const UpdateArgs = required<{
  datum: number;
  delta: number; // ms
}>();

export const useDecay = Args.wrap(
  ({ initialValue, minDelta, maxDelta, halfLife }) => {
    const signal = useRef(initialValue);

    const update = UpdateArgs.wrap(({ datum, delta }) => {
      const decay = Math.pow(0.5, delta / halfLife);
      if (delta < minDelta) {
      } else if (delta > maxDelta) signal.current = 1000 / delta;
      else signal.current = decay * signal.current + (1 - decay) * datum;
      if (isNaN(signal.current)) {
        warn('Signal was NaN...');
        signal.current = 0;
      }
      return signal.current;
    });

    return update;
  }
);
