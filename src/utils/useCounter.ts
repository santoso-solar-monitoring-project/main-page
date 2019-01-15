import { useState, useCallback } from 'react';

function useCounter(initial: number = 0): [number, () => void] {
  const [value, setValue] = useState(initial);
  const increment = useCallback(() => setValue(i => i + 1), []);
  return [value, increment];
}

export default useCounter;
