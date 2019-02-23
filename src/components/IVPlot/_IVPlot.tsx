import { useRef, useMemo } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { usePoints } from 'components/usePoints';
import { useLine } from 'components/useLine';
import { useDataFeed } from './useDataFeed';
import { useView } from './useView';
import { clear, getContext } from 'utils/canvas';
import { useDash } from './useDash';
import { useFPS } from './useFPS';
import { useScalesXY } from './useScales';
import { useTimespan } from './useTimespan';
import { useAnimationFrame } from './useAnimationFrame';
import { useClip } from './useCrop';
import { useZoom } from './useZoom';

export const _IVPlot = GoodCanvasChild.wrap(props => {
  const amps = useDataFeed({
    samplePeriod: 500,
    maxSize: 1000,
  });
  const volts = useDataFeed({
    samplePeriod: 500,
    maxSize: 1000,
  });

  const [scaleX, scaleY] = useScalesXY({
    padding: { y: { height: 0.05 } },
    ...props,
  });
  const [, scaleY2] = useScalesXY({
    padding: { y: { height: 0.05 } },
    ...props,
  });

  const timespan = useTimespan({
    speed: 100,
    ...props,
  });

  const baseScale = scaleX.copy().domain([-timespan, 0]);
  const zoomedScale = useZoom({ baseScale, ...props });

  const [ampsView, updateAmpsView] = useView({
    scaleX: zoomedScale,
    scaleY: scaleY,
    buffer: amps,
  });
  const [voltsView, updateVoltsView] = useView({
    scaleX: zoomedScale,
    scaleY: scaleY2,
    buffer: volts,
  });

  const dashed = useDash({ segments: [4, 6], period: 1000 });
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
    updateAmpsView,
    updateVoltsView,
    clear,
    outside(dashed(line)),
    outside(dashed(line2)),
    inside(line, points),
    inside(line2, points2),
    useFPS({ offset: { x: { height: -0.1 } } }),
  ];

  let n = 0;
  useAnimationFrame(() => {
    const { ctx } = getContext(props.canvasRef);
    animations.forEach(e => e(ctx));
    console.log('frame:', ++n);
  });

  return null;
});
