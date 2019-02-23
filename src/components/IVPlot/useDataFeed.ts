import { useEffect } from 'react';
import { Pair } from 'utils/Pair';
import { useDataBufferSilent } from 'utils/CustomHooks';
import { declare, required, defaults } from 'utils/DefaultProps';

const Args = declare(
  required<{
    samplePeriod: number; // ms
  }>(),
  defaults({
    maxSize: 1000,
    initialValue: [] as Pair[],
  })
);

export const useDataFeed = Args.wrap(
  ({ samplePeriod, maxSize, initialValue }) => {
    const [buffer, concat] = useDataBufferSilent<Pair>({
      maxSize,
      initialValue,
    });

    useEffect(() => {
      let id: number;

      const receiveData = () => {
        concat([generate()]);
        id = window.setTimeout(
          receiveData,
          samplePeriod + 250 * (Math.random() - 0.5)
        );
      };
      receiveData();

      return () => clearTimeout(id);
    }, []);

    return buffer;
  }
);

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];
const [lo, hi] = [Math.min(...CURRENT), Math.max(...CURRENT)];
const generate = (): Pair => [Date.now(), Math.random() * (hi - lo) + lo];

const initialValue = CURRENT.map((v, i): Pair => [i * 500, v]);
