import { useCounter, useSilentCounter } from 'utils/CustomHooks';
import { useEffect, useRef } from 'react';
import noop from 'utils/noop';

export function useAnimationFrame(
  f: () => void = noop,
  { silent = true } = {},
  inputs?: React.InputIdentityList
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
      f();
      nextFrame();
      id = requestAnimationFrame(loop);
    };
    let id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, inputs);
}
