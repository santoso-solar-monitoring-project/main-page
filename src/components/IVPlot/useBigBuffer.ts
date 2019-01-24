import { useEffect } from 'react';
import { withImm } from 'utils/Imm';
import Denque from 'denque';
import { Pair } from 'utils/Pair';
import { useDataBufferSilent } from 'utils/CustomHooks';
import * as Anim from 'components/Animatable';

export interface Args {
  samplePeriod: Anim.Wire<number>;
  maxSize?: number;
  initialValue?: Pair[];
}

export const defaultArgs = {
  maxSize: 10000,
};

export function useBigBuffer(args: Args): Denque<Pair> {
  const { maxSize } = withImm.merge(defaultArgs, args);
  const { samplePeriod, initialValue } = args;

  const [buffer, concat] = useDataBufferSilent<Pair>({
    maxSize,
    initialValue,
  });

  useEffect(() => {
    let id: number;
    const updateData = () => {
      concat([generate()]);
      id = window.setTimeout(
        updateData,
        samplePeriod!.current! + 250 * (Math.random() - 0.5)
      );
    };
    updateData();
    return () => clearTimeout(id);
  }, []);

  return buffer;
}

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];
const [lo, hi] = [Math.min(...CURRENT), Math.max(...CURRENT)];
const generate = (): Pair => [Date.now(), Math.random() * (hi - lo) + lo];

const initialValue = CURRENT.map((v, i): Pair => [i * 500, v]);
