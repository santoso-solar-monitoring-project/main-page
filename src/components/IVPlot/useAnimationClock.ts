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
    config: { duration: 0 },
  }));
  useAnimationFrame(() => {
    update({ clock: clock.value + 1 });
  }, args);
  return clock;
});
