import { useCounter, useSilentCounter } from 'utils/CustomHooks';
import { useEffect, useRef } from 'react';
import noop from 'utils/noop';

export function useAnimationFrame(
  f: (...args: any[]) => void = noop,
  { silent = false } = {}
) {
  const choice = useRef(silent);
  if (silent !== choice.current) {
    throw Error(
      'useAnimationFrame got different values for its `silent` parameter across different renders.'
    );
  }
  choice.current = silent;

  const [, nextFrame] = silent ? useSilentCounter() : useCounter();
  useEffect(() => {
    const loop = () => {
      // console.log(++n);
      f();
      nextFrame();
      // id = requestAnimationFrame(loop);
    };
    // let id = requestAnimationFrame(loop);
    // return () => cancelAnimationFrame(id);

    // let n = 0;
    let id = window.setInterval(loop, 16.7);
    return () => window.clearInterval(id);
  }, []);
}
