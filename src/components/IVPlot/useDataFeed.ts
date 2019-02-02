import { useEffect } from 'react';
import Denque from 'denque';
import { Pair } from 'utils/Pair';
import { useDataBufferSilent } from 'utils/CustomHooks';
import { declare } from 'utils/DefaultProps';
import { useMemoSpring } from 'utils/CustomHooks';

const Args = declare(
  class {
    static required: {
      samplePeriod: number; // milliseconds
    };
    static defaults = {
      maxSize: 10000,
      initialValue: [] as Pair[],
    };
  }
);

function useDataFeed(args: typeof Args.propsOut): [Denque<Pair>, number] {
  const { samplePeriod, maxSize, initialValue } = args;

  const [buffer, concat] = useDataBufferSilent<Pair>({
    maxSize,
    initialValue,
  });

  const [observedSamplePeriod, setObservedSamplePeriod] = useMemoSpring(
    samplePeriod
  );
  useEffect(() => {
    let id: number;
    let last = Date.now();
    const updateData = () => {
      const now = Date.now();
      setObservedSamplePeriod(now - last);
      last = now;
      concat([generate()]);
      id = window.setTimeout(
        updateData,
        samplePeriod + 250 * (Math.random() - 0.5)
      );
    };
    updateData();
    return () => clearTimeout(id);
  }, []);

  return [buffer, observedSamplePeriod];
}

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];
const [lo, hi] = [Math.min(...CURRENT), Math.max(...CURRENT)];
const generate = (): Pair => [Date.now(), Math.random() * (hi - lo) + lo];

const initialValue = CURRENT.map((v, i): Pair => [i * 500, v]);

export default Args.wrap(useDataFeed);
