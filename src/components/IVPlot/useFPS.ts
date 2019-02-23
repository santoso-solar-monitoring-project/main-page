import { newEffect, EffectOptions, RelativeCoordinates } from 'utils/canvas';
import { useMemoRef } from 'utils/CustomHooks';
import { config, useSpring } from 'react-spring';
import { defaults } from 'utils/DefaultProps';

const Args = EffectOptions.extend(
  defaults({
    position: {
      x: {
        width: 1,
        height: 0,
      },
      y: {
        width: 0,
        height: 1,
      },
    } as RelativeCoordinates,
    offset: {
      x: {
        width: 0,
        height: -0.05,
      },
      y: {
        width: 0,
        height: -0.025,
      },
    } as RelativeCoordinates,
  })
);

export const useFPS = Args.wrap(args => {
  const { position, offset, ...options } = args;
  const [{ delta }, update] = useSpring(() => ({
    delta: 0,
    config: config.slow,
  }));
  const last = useMemoRef(() => performance.now());

  return newEffect(
    ctx => {
      const now = performance.now();
      update({ delta: now - last.current });
      last.current = now;
      const fps = delta.value > 10 ? 1000 / delta.value : 60;

      const fontHeight = 20;
      ctx.font = `${fontHeight}px ubuntu mono, monospace`;
      ctx.fillStyle = '#fff';
      const text = `${fps.toFixed(1)} FPS`;
      const { width: textWidth } = ctx.measureText(text);
      const { x, y } = ctx.deriveCoordinates(position);
      const { x: offsetX, y: offsetY } = ctx.deriveCoordinates(offset);
      ctx.fillText(text, x + offsetX - textWidth, y + offsetY);
    },
    {
      inputs: [args],
      ...options,
    }
  );
});
