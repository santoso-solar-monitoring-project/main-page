import { GoodCanvasElement } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { REF, CREF } from 'utils/easy';

interface Args {
  canvasRef: CREF<typeof GoodCanvasElement.propsOut>;
  timespan: REF<number>; // milliseconds
  speed: REF<number>; // translate by pixels / second
  zoom: REF<number>; // factor to scale data down by
  stride: REF<number>; // take "one of every `stride`" elements of buffer
  baseSampleDensity: number; // minimum samples per pixel
  samplePeriod: number; // milliseconds between data points
}

// update timespan and stride (based on canvas width and zoom)
export function useTimeSpan(args: Args) {
  const {
    canvasRef,
    timespan,
    speed,
    zoom,
    samplePeriod,
    baseSampleDensity,
    stride,
  } = args;

  if (canvasRef.current) {
    const { canvas } = getContext(canvasRef);
    // timespan = width / speed
    timespan.current =
      (zoom.current * canvas.dims.width) / (speed.current / 1000);

    // stride = sample density / desired sample density
    const sampleDensity =
      zoom.current / ((samplePeriod * speed.current) / 1000);
    const oversampling = sampleDensity / baseSampleDensity;
    stride.current = Math.max(1, Math.floor(oversampling));
  }
}
