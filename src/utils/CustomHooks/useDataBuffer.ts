import { useState, useCallback } from 'react';
import { withImm } from 'utils/Imm';
import Denque from 'denque';

const defaults = {
  maxSize: Infinity,
};

interface Args<T extends number> extends Partial<typeof defaults> {
  initialValue: T[];
}

export function useDataBuffer<T extends number = number>(
  args: Args<T>
): [Denque<T>, (newData: T[]) => void] {
  // const { initialValue, maxSize } = withImm.merge(defaults, args);
  const { initialValue, maxSize } = withImm.merge(args);
  const [buffer, setBuffer] = useState(() => new Denque<T>(initialValue));
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
