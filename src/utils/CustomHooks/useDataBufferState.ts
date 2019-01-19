import { useState, useCallback } from 'react';
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

export function useDataBufferState<T = number>(
  args: DefaultArgsType<T> = {}
): [Denque<T>, (newData: T[]) => void] {
  const { initialValue, maxSize }: DefaultArgsType<T> = defaultArgs
    .mergeDeep(args)
    .toJS();
  const [buffer, setBuffer] = useState(() => new Denque<T>(initialValue!));
  const updateBuffer = useCallback(
    (newData: T[]) =>
      setBuffer(buf => {
        buf.splice(buf.length, 0, ...newData);
        if (buf.length > maxSize!) {
          buf.splice(0, buf.length - maxSize!);
        }
        return buf;
      }),
    [maxSize]
  );
  return [buffer, updateBuffer];
}
