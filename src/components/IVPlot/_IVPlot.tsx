import { GoodCanvasChild } from 'components/GoodCanvas';
import { usePoints } from 'components/usePoints';
import { useLine } from 'components/useLine';
import { useDataFeed } from './useDataFeed';
import { useView } from './useView';
import {
  clear,
  getContext,
  CanvasEffect,
  newEffect,
  EffectOptions,
} from 'utils/canvas';
import { useDash } from './useDash';
import { useFPS } from './useFPS';
import { useScalesXY } from './useScales';
import { useTimespan } from './useTimespan';
import { useAnimationFrame } from './useAnimationFrame';
import { useClip } from './useCrop';
import { useControls } from './useControls';
import { usePaddingSpring } from './usePaddingSpring';
import * as d3 from 'd3';
import { diff } from 'utils/diff';
import { Pair } from 'utils/Pair';
import clamp from 'utils/clamp';
import { useGlow } from 'components/Glow';
import { defaults, declare, required } from 'utils/DefaultProps';
import { REF } from 'utils/easier';

export const _IVPlot = GoodCanvasChild.wrap(props => {
  const samplePeriod = 400;
  const amps = useDataFeed({
    samplePeriod: samplePeriod,
    maxSize: 1000,
  });
  const volts = useDataFeed({
    samplePeriod: samplePeriod,
    maxSize: 1000,
  });

  const [scaleX, scaleY] = useScalesXY({
    padding: { y: { height: 0.1 } },
    ...props,
  });
  const [, scaleY2] = useScalesXY({
    padding: { y: { height: 0.1 } },
    ...props,
  });

  const timespan = useTimespan({
    speed: 100,
    ...props,
  });

  const baseScale = scaleX.copy().domain([-timespan, 0]);
  const [zoomedScale, updateZoomedScale] = useControls({ baseScale, ...props });

  const padding = usePaddingSpring({ by: 2 * samplePeriod });
  const { view: ampsView, update: updateAmpsView } = useView({
    scaleX: zoomedScale,
    scaleY: scaleY,
    buffer: amps,
    padding,
  });
  const {
    view: voltsView,
    update: updateVoltsView,
    scaleX: viewScale,
  } = useView({
    scaleX: zoomedScale,
    scaleY: scaleY2,
    buffer: volts,
    padding,
  });

  const Args = declare(
    required<{
      viewScale: d3.ScaleLinear<number, number>;
    }>(),
    defaults({
      style: {
        fillStyle: '#888',
        strokeStyle: '#444',
        font: '14px ubuntu mono, monospace',
      },
    }),
    EffectOptions
  );

  const useTicks = Args.wrap(({ viewScale, ...effectOptions }) => {
    const scale = d3.scaleTime().range(baseScale.range());
    const format = scale.tickFormat();

    return newEffect(
      ctx => {
        scale.domain(viewScale.domain());
        const span = diff(scale.domain() as Pair<Date>, x => x.getTime());
        const every = clamp(span / timespan, [1]);
        const ticks = scale.ticks(d3.timeSecond.every(every)!);
        const gap = diff(ticks.slice(0, 2) as Pair<Date>, scale);
        const pad = clamp(0.05 * gap, [1]);

        for (const tick of ticks) {
          const t = scale(tick);
          ctx.beginPath();
          ctx.moveTo(t, 0);
          ctx.lineTo(t, ctx.height);
          ctx.stroke();
          ctx.fillText(format(tick), t + pad, ctx.height - pad);
        }
      },
      { ...effectOptions }
    );
  });

  const LabelsArgs = declare(
    required<{ data: REF<Pair[]>; scaleY: d3.ScaleLinear<number, number> }>(),
    defaults({ style: { font: '14px ubuntu mono, monospace' } })
  );

  const useLabels = LabelsArgs.wrap(({ data, scaleY, ...effectOptions }) => {
    const format = (x: number) => x.toFixed(1); //d3.format('.1f');
    return newEffect(
      ctx => {
        const pad = clamp(0.01 * ctx.height, [1]);
        for (const [x, y] of data.current) {
          ctx.fillText(format(scaleY.invert(y)), x + pad, y - pad);
        }
      },
      { ...effectOptions }
    );
  });

  const dashed = useDash({ segments: [4, 6], period: 1000 });
  const inside = useClip({ by: { height: 0.1 } });
  const outside = useClip({ by: { height: 0.1 }, invert: true });
  const glow1 = useGlow({
    spread: 0.5,
    blur: 10,
    color: 'hsl(330, 100%, 50%)',
  });
  const glow2 = useGlow({
    spread: 0.5,
    blur: 10,
    color: 'hsl(210, 100%, 50%)',
  });
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

  const animations: CanvasEffect[] = [
    updateZoomedScale,
    updateAmpsView,
    updateVoltsView,
    clear,
    useTicks({ viewScale }),
    outside(dashed(line), dashed(line2)),
    inside(
      line,
      points(useLabels({ data: ampsView, scaleY })),
      line2,
      points2(useLabels({ data: voltsView, scaleY: scaleY2 }))
    ),
    useFPS({
      offset: { x: { height: -0.1 }, y: { height: -0.9 } },
      style: { fillStyle: 'hsl(90, 75%, 50%)' },
    }),
  ];

  // let n = 0;
  useAnimationFrame(
    () => {
      const { ctx } = getContext(props.canvasRef);
      animations.forEach(e => e(ctx));
      // console.log('frame:', ++n);
    }
    // ,{ interval: 500 }
  );

  return null;
});
