import { useAnimationFrame, Args as FrameArgs } from './useAnimationFrame';
import { useSpring } from 'react-spring';
import { defaults } from 'utils/DefaultProps';

const Args = FrameArgs.extend(
  defaults({
    // interval: 750,
  })
);

export const useAnimationClock = Args.wrap(args => {
  const [{ clock }, update] = useSpring(() => ({
    clock: 0,
    immediate: true,
  }));
  useAnimationFrame(() => {
    update({ clock: clock.value + args.interval });
  }, args);
  return clock;
});
