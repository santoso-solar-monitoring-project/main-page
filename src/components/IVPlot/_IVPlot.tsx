import { useRef, useMemo, useEffect } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { usePoints } from 'components/usePoints';
import { useLine } from 'components/useLine';
import useDataFeed from './useDataFeed';
import { useView } from './useView';
import { clear, getContext } from 'utils/canvas';
import { useDash } from './useDash';
import { useFPS } from './useFPS';
import { useScalesXY } from './useScales';
import { FC } from 'utils/easy';
import { useTimeSpan } from './useTimeSpan';
import { useAnimationFrame } from './useAnimationFrame';
import { useClip } from './useCrop';
import { Pair } from 'utils/Pair';
import * as d3 from 'd3';

const _IVPlot: FC<typeof GoodCanvasChild.Props.propsOut> = props => {
  const { canvasRef, canvasNeedsUpdate } = props;

  const [amps, samplePeriod] = useDataFeed({
    samplePeriod: 500,
    maxSize: 10000,
  });
  const [volts] = useDataFeed({
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
  const [, scaleY2] = useScalesXY(canvasRef, canvasNeedsUpdate, padX, padY);

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

  const diff = ([l, r]: Pair) => r - l;
  const baseScale = useMemo(
    () => d3.scaleLinear().domain([-timespan.current, 0]),
    []
  );
  const zoomedScale = useRef(baseScale);
  {
    useEffect(() => {
      console.log(
        'hi',
        scaleX.range(),
        diff(scaleX.range() as Pair),
        baseScale.domain()
      );
      baseScale.range(scaleX.range());
    }, [canvasNeedsUpdate]);

    const zoom = d3
      .zoom<HTMLCanvasElement, any>()
      .scaleExtent([1 / 20, 1])
      .translateExtent([[-20 * diff(baseScale.range() as Pair), 0], [0, 0]]);
    useEffect(() => {
      zoom.on('zoom', () => {
        const t = d3.event.transform as ReturnType<typeof d3.zoomTransform>;
        zoomedScale.current = t.rescaleX(baseScale);
        console.log(
          t.toString(),
          t.rescaleX(baseScale).domain(),
          baseScale.domain()
        );
      });
      d3.select(canvasRef.current as HTMLCanvasElement).call(zoom);
      Object.assign(window, { canvas: canvasRef.current });
    }, []);
  }

  const seekOffset = useRef(0); // milliseconds to shift window into the past by
  const { view: ampsView } = useView(
    zoomedScale.current,
    scaleY,
    amps,
    seekOffset.current,
    timespan.current,
    samplePeriod,
    stride.current
  );
  const { view: voltsView } = useView(
    zoomedScale.current,
    scaleY2,
    volts,
    seekOffset.current,
    timespan.current,
    samplePeriod,
    stride.current
  );

  const dashed = useDash({ segments: [4, 6], speed: 1 });
  const inside = useClip({ by: { height: 0.1 } });
  const outside = useClip({ by: { height: 0.1 }, invert: true });
  const line = useLine({
    data: ampsView,
    style: { strokeStyle: 'hsl(330, 100%, 67%)' },
  });
  const points = usePoints({ data: ampsView });
  const line2 = useLine({
    data: voltsView,
    style: { strokeStyle: 'hsl(210, 100%, 67%)' },
  });
  const points2 = usePoints({
    data: voltsView,
    style: {
      fillStyle: 'hsl(210, 100%, 75%)',
      strokeStyle: 'hsl(210, 100%, 50%)',
    },
  });

  const animations = [
    clear,
    outside(dashed(line)),
    outside(dashed(line2)),
    inside(line, points),
    inside(line2, points2),
    useFPS({ offset: { x: { height: -0.1 } } }),
  ];

  if (canvasRef.current) {
    const { ctx } = getContext(canvasRef);
    animations.forEach(e => e(ctx));
  }

  useAnimationFrame();

  return null;
};

export default GoodCanvasChild.Props.wrap(_IVPlot);
