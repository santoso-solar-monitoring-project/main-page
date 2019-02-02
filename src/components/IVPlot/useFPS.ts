import { useRef } from 'react';
import { GoodCanvasElement } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { useFIR, useDecay, useMemoSpring } from 'utils/CustomHooks';
import { CREF } from 'utils/easy';
import { config } from 'react-spring';

export function useFPS(canvasRef: CREF<typeof GoodCanvasElement.propsOut>) {
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
  const fps = delta > 1 ? 1000 / delta : 0;
  last.current = now;

  if (canvasRef.current) {
    const { canvas, ctx } = getContext(canvasRef);
    ctx.isolate(() => {
      ctx.font = `20px ubuntu mono`;
      ctx.fillStyle = '#fff';
      const text = `${fps.toFixed(1)} FPS`;
      const { width } = ctx.measureText(text);
      ctx.fillText(text, canvas.dims.width - width - 5, canvas.dims.height - 5);
    });
  }
}

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
