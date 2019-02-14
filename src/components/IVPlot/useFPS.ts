import { newEffect, EffectOptions, RelativeCoordinates } from 'utils/canvas';
import { useFIR, useDecay, useMemoSpring, useMemoRef } from 'utils/CustomHooks';
import { config } from 'react-spring';
import { declare } from 'utils/DefaultProps';
import { useRef } from 'react';

const Args = declare(
  class {
    static defaults = {
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
    };
  },
  EffectOptions
);

export const useFPS = Args.wrap(
  args => {
    const { position, offset, style, injectEffect } = args;
    const last = useMemoRef(() => performance.now());
    const now = performance.now();
    // Three options (+ combos): FIR, exponential, spring
    // const delta0 = useFIR(now - last.current, taps);
    const delta0 = useDecay({
      datum: now - last.current,
      delta: now - last.current,
      halfLife: 125,
    });
    const [delta] = useMemoSpring(delta0, config.slow);
    // const [delta] = useMemoSpring(now - last.current, config.gentle);
    const fps = useRef(0);
    fps.current = delta > 10 ? 1000 / delta : 60;
    last.current = now;

    return newEffect(
      ctx => {
        const fontHeight = 20;
        ctx.font = `${fontHeight}px ubuntu mono, monospace`;
        ctx.fillStyle = '#fff';
        const text = `${fps.current.toFixed(1)} FPS`;
        const { width: textWidth } = ctx.measureText(text);
        const { x, y } = ctx.deriveXY(position);
        const { x: offsetX, y: offsetY } = ctx.deriveXY(offset);
        ctx.fillText(text, x + offsetX - textWidth, y + offsetY);
      },
      {
        style: style,
        injectEffect: injectEffect,
        inputs: [args],
      }
    );
  },
  { hint: 'all props optional' }
);

// See `notebooks/Lowpass.ipynb` for filter generating code
const taps = [
  0.00154448,
  0.01623653,
  0.01344441,
  -0.00469252,
  -0.03511244,
  -0.04862442,
  -0.01178786,
  0.0836834,
  0.20382728,
  0.28770902,
  0.28770902,
  0.20382728,
  0.0836834,
  -0.01178786,
  -0.04862442,
  -0.03511244,
  -0.00469252,
  0.01344441,
  0.01623653,
  0.00154448,
];
