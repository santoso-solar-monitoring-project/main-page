import { withImm } from 'utils/Imm';

export interface Args {
  event: string;
  customEvent: string;
  _window?: typeof window;
}

export const defaultArgs = {
  _window: window,
};

const throttle = (args: Args) => {
  // unpack args
  const { _window } = withImm.mergeIntersect(defaultArgs, args);
  const { event, customEvent } = args;

  if (!event) throw Error('`event` should not be blank');
  if (!customEvent) throw Error('`customEvent` should not be blank');

  let ready = true;

  const dispatcher = () => {
    // dispatchEvent is synchronous (waits for event listener to finish running)
    _window!.dispatchEvent(new CustomEvent(customEvent));
    ready = true;
  };

  const throttler = () => {
    if (ready) {
      ready = false;
      requestAnimationFrame(dispatcher);
    }
  };

  _window!.addEventListener(event, throttler, { passive: true });

  const cleanup = () => {
    _window!.removeEventListener(event, throttler);
  };

  return cleanup;
};

export const optimizedResize = 'optimized-resize';
throttle({ event: 'resize', customEvent: optimizedResize });

export default throttle;
