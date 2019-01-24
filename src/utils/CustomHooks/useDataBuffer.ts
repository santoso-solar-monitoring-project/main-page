import { useState, useCallback } from 'react';
import { withImm } from 'utils/Imm';
import Denque from 'denque';

interface Args<T> {
  initialValue: T[];
  maxSize?: number;
}

const defaultArgs = {
  maxSize: Infinity,
};

export function useDataBuffer<T = number>(
  args: Args<T>
): [Denque<T>, (newData: T[]) => void] {
  const { initialValue } = args;
  const { maxSize } = withImm.merge(defaultArgs, args);
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
