import { useCounter, useSilentCounter } from 'utils/CustomHooks';
import { useEffect, useRef } from 'react';
import noop from 'utils/noop';

export function useAnimationFrame(
  f: () => void = noop,
  { silent = true, interval = 16 } = {},
  inputs?: React.InputIdentityList
) {
  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      console.error(
        "Options passed to useAnimationFrame were toggled in the same lifecycle of the component. Don't do this! Options must be kept constant or React hooks won't work."
      );
    }
  }, [silent, interval]);

  const [, nextFrame] = silent ? useSilentCounter() : useCounter();

  if (interval == 16) {
    useEffect(() => {
      const loop = () => {
        f();
        nextFrame();
        id = window.requestAnimationFrame(loop);
      };
      let id = window.requestAnimationFrame(loop);
      return () => window.cancelAnimationFrame(id);
    }, inputs);
  } else {
    useEffect(() => {
      const loop = () => {
        f();
        nextFrame();
      };
      let id = window.setInterval(loop, interval);
      return () => window.clearInterval(id);
    }, inputs);
  }
}
