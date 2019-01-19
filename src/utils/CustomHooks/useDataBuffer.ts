import { useMemo, useCallback } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import Denque from 'denque';

interface ArgsType<T> {
  initialValue: T[];
  maxSize: number;
}

type DefaultArgsType<T> = Partial<ArgsType<T>>;
type ImmDefaultArgsType<T> = ImmMapType<DefaultArgsType<T>>;

const defaultArgs: ImmDefaultArgsType<any> = Imm.fromJS({
  maxSize: Infinity,
});

export function useDataBuffer<T = number>(
  args: DefaultArgsType<T> = {}
): [Denque<T>, (newData: T[]) => void] {
  const { initialValue, maxSize }: DefaultArgsType<T> = defaultArgs
    .mergeDeep(args)
    .toJS();
  const buffer = useMemo(() => new Denque<T>(initialValue!), []);
  const updateBuffer = useCallback(
    (newData: T[]) => {
      buffer.splice(buffer.length, 0, ...newData);
      if (buffer.length > maxSize!) {
        buffer.splice(0, buffer.length - maxSize!);
      }
    },
    [maxSize]
  );
  return [buffer, updateBuffer];
}
