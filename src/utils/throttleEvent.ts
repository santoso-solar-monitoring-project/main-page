import Imm, { ImmMapType } from 'utils/Imm';
import { DefaultArgsFunction } from './DefaultArgsFunction';

export interface ArgsType {
  event: string;
  customEvent: string;
  _window: typeof window;
}

export type DefaultArgsType = Partial<ArgsType>;
export type ImmDefaultArgsType = ImmMapType<DefaultArgsType>;

export const defaultArgs: ImmDefaultArgsType = Imm.fromJS({
  _window: window,
});

type ThrottleType = DefaultArgsFunction<DefaultArgsType, () => void>;

const throttle: ThrottleType = (args: DefaultArgsType) => {
  // unpack args
  const {
    event,
    customEvent,
    _window,
  }: DefaultArgsType = defaultArgs.mergeDeep(args).toJS();

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

throttle.defaultArgs = defaultArgs.toJS();

export const optimizedResize = 'optimized-resize';
throttle({ event: 'resize', customEvent: optimizedResize });

export default throttle;
