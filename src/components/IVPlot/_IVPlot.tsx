import { useRef, useEffect, useCallback, useMemo } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { usePoints } from 'components/usePoints';
import { useLine } from 'components/useLine';
import useDataFeed from './useDataFeed';
import { useView } from './useView';
import { clear, getContext, newEffect } from 'utils/canvas';
import { useFPS } from './useFPS';
import { useScalesXY } from './useScales';
import { FC } from 'utils/easy';
import { useTimeSpan } from './useTimeSpan';
import { useAnimationFrame } from './useAnimationFrame';
import { useMemoSpring } from 'utils/CustomHooks';
import { config } from 'react-spring';
import { useImm } from 'utils/Imm';
import { useCrop } from './useCrop';

const _IVPlot: FC<typeof GoodCanvasChild.Props.propsOut> = props => {
  const { canvasRef, canvasNeedsUpdate } = props;

  const [amps, samplePeriod] = useDataFeed({
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
  const { view, padLeft, padRight } = useView(
    scaleX,
    scaleY,
    amps,
    seekOffset.current,
    timespan.current,
    samplePeriod,
    stride.current
  );

  const useDashes = (segments: number[], speed = 1) => {
    const total = segments.reduce((a, x) => a + x, 0);
    let offset = 0;
    useAnimationFrame(
      () => {
        offset = (offset + speed) % total;
      },
      { silent: true }
    );
    return useImm(useMemo)(() => {
      return newEffect(ctx => {
        ctx.setLineDash(segments);
        ctx.lineDashOffset = offset;
      });
    }, [segments]);
  };

  const dashed = useDashes([4, 6], 1);
  const cropped = useCrop({ height: 0.1 });
  const outerCropped = useCrop({ height: 0.1, invert: true });
  const renderLoop = [
    clear,
    outerCropped(
      dashed(
        useLine({
          data: view,
          // canvasStyle: { strokeStyle: 'green', lineWidth: 10 },
        })
      )
    ),
    cropped(
      useLine({
        data: view,
        // canvasStyle: { strokeStyle: 'blue' },
      }),
      usePoints({ data: view })
    ),
    useFPS({ offset: { x: { height: -0.1 } } }),
  ];

  if (canvasRef.current) {
    const { ctx } = getContext(canvasRef);
    renderLoop.forEach(e => e(ctx));
  }

  useAnimationFrame();

  return null;
};

export default GoodCanvasChild.Props.wrap(_IVPlot);
