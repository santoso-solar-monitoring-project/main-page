import { newEffect, EffectOptions, RelativeCoordinates } from 'utils/canvas';
import { useMemoRef, useDecay } from 'utils/CustomHooks';
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
    style: {
      font: '20px ubuntu mono, monospace',
      fillStyle: '#fff',
    } as typeof EffectOptions.propsOut.style,
  }),
  EffectOptions
);

export const useFPS = Args.wrap(args => {
  const { position, offset, ...effectOptions } = args;
  const updateDecay = useDecay({ halfLife: 125 });
  const [{ delta }, update] = useSpring(() => ({
    delta: 0,
    config: config.slow,
  }));
  const last = useMemoRef(() => performance.now());

  return newEffect(
    ctx => {
      // Update metrics
      const now = performance.now();
      const decayed = updateDecay({
        datum: now - last.current,
        delta: now - last.current,
      });
      update({ delta: decayed });
      last.current = now;
      const fps = delta.value > 10 ? 1000 / delta.value : 60;

      // Display to canvas
      const text = `${fps.toFixed(1)} FPS`;
      const { width: textWidth } = ctx.measureText(text);
      const { x, y } = ctx.deriveCoordinates(position);
      const { x: offsetX, y: offsetY } = ctx.deriveCoordinates(offset);
      ctx.fillText(text, x + offsetX - textWidth, y + offsetY);
    },
    {
      inputs: [args],
      ...effectOptions,
    }
  );
});
