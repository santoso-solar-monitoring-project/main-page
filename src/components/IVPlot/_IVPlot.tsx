import { useRef, useEffect } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import usePoints from 'components/usePoints';
import useLine from 'components/useLine';
import useDataFeed from './useDataFeed';
import { useView } from './useView';
import { clear } from 'utils/canvas';
import { useFPS } from './useFPS';
import { useScalesXY } from './useScales';
import { FC } from 'utils/easy';
import { useTimeSpan } from './useTimeSpan';
import { useCounter } from 'utils/CustomHooks';

const _IVPlot: FC<typeof GoodCanvasChild.Props.propsOut> = props => {
  const { canvasRef, canvasStyle, canvasEffects, canvasNeedsUpdate } = props;

  const [buffer, samplePeriod] = useDataFeed({
    samplePeriod: 500,
    maxSize: 10000,
  });

  const padX = 0; // fraction of canvas width (applied left and right)
  const padY = 0.05; // fraction of canvas height (applied top and bottom)
  const [scaleX, scaleY] = useScalesXY(
    canvasRef,
    canvasNeedsUpdate,
    padX,
    padY
  );

  const timespan = useRef(7000); // milliseconds
  const speed = useRef(100); // translate by pixels / second
  const zoom = useRef(1); // factor to scale data down by
  const baseSampleDensity = 0.1; // minimum samples per pixel
  const stride = useRef(1); // take "one of every `stride`" elements of buffer
  useTimeSpan({
    canvasRef,
    timespan,
    speed,
    zoom,
    samplePeriod,
    baseSampleDensity,
    stride,
  });

  const seekOffset = useRef(0); // milliseconds to shift window into the past by
  const view = useView(
    scaleX,
    scaleY,
    buffer,
    seekOffset.current,
    timespan.current,
    samplePeriod,
    stride.current
  );

  clear(canvasRef);

  useLine({ data: view, canvasRef, canvasStyle, canvasEffects });
  usePoints({ data: view, canvasRef, canvasStyle, canvasEffects });
  useFPS(canvasRef);

  const [, nextFrame] = useCounter();
  useEffect(() => {
    const loop = () => {
      nextFrame();
      id = requestAnimationFrame(loop);
    };
    let id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);

    // let n = 0;
    // let id = window.setInterval(loop, 16);
    // return () => window.clearInterval(id);
  }, []);

  return null;
};

export default GoodCanvasChild.Props.wrap(_IVPlot);
