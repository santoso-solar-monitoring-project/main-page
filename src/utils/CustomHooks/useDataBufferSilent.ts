import { useMemo, useCallback } from 'react';
import { withImm } from 'utils/Imm';
import Denque from 'denque';

const defaults = {
  maxSize: Infinity,
};

interface Args<T> extends Partial<typeof defaults> {
  initialValue?: T[];
}

export function useDataBufferSilent<T = number, U extends Array<T> = T[]>(
  args: Args<T>
): [Denque<T>, (newData: U) => void] {
  const { initialValue, maxSize } = withImm.mergeFull(defaults, args);
  const buffer = useMemo(
    () => (initialValue ? new Denque<T>(initialValue) : new Denque<T>()),
    []
  );
  const updateBuffer = useCallback((newData: U) => {
    buffer.splice(buffer.length, 0, ...newData);
    if (buffer.length > maxSize!) {
      buffer.splice(0, buffer.length - maxSize!);
    }
  }, []);
  return [buffer, updateBuffer];
}
