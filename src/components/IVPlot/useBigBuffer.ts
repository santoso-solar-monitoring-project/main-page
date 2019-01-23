import Imm, { ImmMapType } from 'utils/Imm';
import { useEffect } from 'react';
import Denque from 'denque';
import { PairType } from 'utils/Pair';
import { useDataBufferSilent } from 'utils/CustomHooks';
import * as A from 'components/Animatable';

export interface ArgsType {
  samplePeriod: A.wire<number>;
  maxSize?: number;
  initialValue?: PairType[];
}

export type DefaultArgsType = Partial<ArgsType>;
export type ImmDefaultArgsType = ImmMapType<DefaultArgsType>;
export const defaultArgs: ImmDefaultArgsType = Imm.fromJS({
  maxSize: 10000,
});

export function useBigBuffer(args: DefaultArgsType): Denque<PairType> {
  const {
    samplePeriod,
    maxSize,
    initialValue,
  }: DefaultArgsType = defaultArgs.mergeDeep(args).toJS();

  const [buffer, concat] = useDataBufferSilent<PairType>({
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
const generate = (): PairType => [Date.now(), Math.random() * (hi - lo) + lo];

const initialValue = CURRENT.map((v, i): PairType => [i * 500, v]);
