import { useRef } from 'react';
import { EnhancedContext, newEffect, EffectOptions } from 'utils/canvas';
import { useFIR, useDecay, useMemoSpring } from 'utils/CustomHooks';
import { config } from 'react-spring';

export const useFPS = EffectOptions.wrap(
  ({ canvasStyle, canvasRestyle }) => {
    const last = useRef(performance.now());
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
    const fps = delta > 10 ? 1000 / delta : 60;
    last.current = now;

    return newEffect(
      ctx => {
        ctx.font = `20px ubuntu mono, monospace`;
        ctx.fillStyle = '#fff';
        const text = `${fps.toFixed(1)} FPS`;
        const { width: textWidth } = ctx.measureText(text);
        const { width, height } = ctx.canvas.dims;
        ctx.fillText(text, width - textWidth - 5, height - 5);
      },
      { canvasStyle, canvasRestyle }
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
