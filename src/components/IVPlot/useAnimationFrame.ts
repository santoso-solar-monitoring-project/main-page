import { useCounter, useSilentCounter } from 'utils/CustomHooks';
import { useEffect, useRef } from 'react';
import noop from 'utils/noop';
import { defaults } from 'utils/DefaultProps';

const batchMap = new Map<number, FrameRequestCallback[]>();

export const Args = defaults({ silent: true, interval: 16, batch: NaN });

export function useAnimationFrame(
  f: FrameRequestCallback = noop,
  options = {},
  inputs?: React.InputIdentityList
) {
  const { silent, interval, batch } = Args(options);

  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      console.error(
        "Options passed to useAnimationFrame were toggled in the same lifecycle of the component. Don't do this! Options must be kept constant or React hooks won't work."
      );
    }
  }, [silent, interval, batch]);

  const [, nextFrame] = silent ? useSilentCounter() : useCounter();

  useEffect(() => {
    let id: number;
    const tail =
      interval == 16
        ? (callback: FrameRequestCallback) =>
            (id = window.requestAnimationFrame(callback))
        : (callback: FrameRequestCallback) =>
            (id = window.setTimeout(callback, interval));

    const tracks = isFinite(batch)
      ? batchMap.has(batch)
        ? (batchMap.get(batch)!.push(f), batchMap.get(batch)!)
        : batchMap.set(batch, [f]).get(batch)!
      : batchMap.set(batchMap.size, [f]).get(batchMap.size - 1)!;

    const loop = (ts: number) => {
      const now = ts || performance.now();
      tracks.forEach(g => g(now));
      nextFrame();
      tail(loop);
    };

    if (interval == 16) {
      id = window.requestAnimationFrame(loop);
      return () => window.cancelAnimationFrame(id);
    } else {
      id = window.setTimeout(loop, interval);
      return () => window.clearTimeout(id);
    }
  }, inputs);
}
