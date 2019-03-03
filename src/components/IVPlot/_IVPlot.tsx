import React, { useRef, useEffect } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { usePoints } from 'components/usePoints';
import { Line } from 'components/useLine';
import { useDataFeed } from './useDataFeed';
import { useView } from './useView';
import { useLine } from './useLine';
import {
  clear,
  getContext,
  CanvasEffect,
  newEffect,
  EffectOptions,
  RelativeCoordinates,
} from 'utils/canvas';
import { useDash } from './useDash';
import { useFPS } from './useFPS';
import { useTimespan } from './useTimespan';
import { useClip } from './useClip';
import { Ticks } from './Ticks';
import { useControls } from './useControls';
import { usePaddingSpring } from './usePaddingSpring';
import * as d3 from 'd3';
import { diff } from 'utils/diff';
import { Pair } from 'utils/Pair';
import clamp from 'utils/clamp';
import { useGlow } from 'components/Glow';
import { defaults, declare, required } from 'utils/DefaultProps';
import { REF, CREF } from 'utils/easier';
import { animated, AnimatedValue, OpaqueInterpolation } from 'react-spring';
import { deriveCoordinates } from 'utils/coordinates';
import Denque from 'denque';
import { number } from 'prop-types';
import noop from 'utils/noop';
import { useAnimationClock } from './useAnimationClock';

const Args = declare(required<{ svgRef: CREF<SVGSVGElement> }>());

export const _IVPlot = Args.wrap(({ svgRef }) => {
  const clock = useAnimationClock();
  const samplePeriod = 400;

  const dims = useRef<DOMRect>({ width: 0, height: 0 } as DOMRect);
  const timespan = useRef(0);
  const speed = 100;
  useEffect(() => {
    dims.current = svgRef.current!.getBoundingClientRect() as DOMRect;
    timespan.current = dims.current.width / (speed / 1000);
  });

  const padDomain = 4 * samplePeriod;
  const padRange = { y: { height: 0.1 } };

  const amps = useLine({
    buffer: useDataFeed({
      samplePeriod: samplePeriod,
      maxSize: 500,
    }),
    scaleX: d3.scaleLinear(),
    scaleY: d3.scaleLinear(),
    timespan,
    dims,
    padDomain,
    padRange,
  });

  const volts = useLine({
    buffer: useDataFeed({
      samplePeriod: samplePeriod,
      maxSize: 500,
    }),
    scaleX: amps.scaleX,
    scaleY: d3.scaleLinear(),
    timespan,
    dims,
    padDomain,
    padRange,
  });

  const updateControls = useControls({ scale: amps.scaleX, svgRef, dims });

  const start = performance.now();
  let count = 0;
  return (
    <>
      <animated.g visibility='hidden'>
        {clock.interpolate(() => {
          // (count % 180 == 0 ? console.clear() : 0) ||
          //   console.log((++count / (performance.now() - start)) * 1000);
          Object.assign(window, {
            svgRef,
            view: amps.view,
            currentScaleX: amps.currentScaleX,
            timespan: timespan.current,
            amps,
            dims,
          });

          updateControls();
          amps.update();
          volts.update();
        })}
      </animated.g>
      <Line stroke='pink' data={clock.interpolate(() => amps.view.current)} />
      <Ticks
        {...{ clock, scale: amps.currentScaleX, timespan, dims, count: 25 }}
      />
      <Line stroke='cyan' data={clock.interpolate(() => volts.view.current)} />
    </>
  );

  // const volts = {
  //   buffer: useDataFeed({
  //     samplePeriod: samplePeriod,
  //     maxSize: 40,
  //   }),
  //   scaleX: amps.scaleX,
  //   scaleY: d3.scaleLinear(),
  // };

  // const {
  //   view: voltsView,
  //   update: updateVoltsView,
  //   currentScaleX
  // } = useView(volts);

  // const LabelsArgs = declare(
  //   required<{ data: REF<Pair[]>; scaleY: d3.ScaleLinear<number, number> }>(),
  //   defaults({ style: { font: '14px ubuntu mono, monospace' } })
  // );

  // const useLabels = LabelsArgs.wrap(({ data, scaleY, ...effectOptions }) => {
  //   const format = (x: number) => x.toFixed(1); //d3.format('.1f');
  //   return newEffect(
  //     ctx => {
  //       const pad = clamp(0.01 * ctx.height, [1]);
  //       for (const [x, y] of data.current) {
  //         ctx.fillText(format(scaleY.invert(y)), x + pad, y - pad);
  //       }
  //     },
  //     { ...effectOptions }
  //   );
  // });

  // const dashed = useDash({ segments: [4, 6], period: 1000 });
  // const inside = useClip({ by: { height: 0.1 } });
  // const outside = useClip({ by: { height: 0.1 }, invert: true });
  // const glow1 = useGlow({
  //   spread: 0.5,
  //   blur: 10,
  //   color: 'hsl(330, 100%, 50%)',
  // });
  // const glow2 = useGlow({
  //   spread: 0.5,
  //   blur: 10,
  //   color: 'hsl(210, 100%, 50%)',
  // });
  // // const line = useLine({
  // //   data: ampsView,
  // //   style: { strokeStyle: 'hsl(330, 100%, 67%)' },
  // // });
  // const points = usePoints({ data: ampsView });
  // // const line2 = useLine({
  // //   data: voltsView,
  // //   style: { strokeStyle: 'hsl(210, 100%, 67%)' },
  // // });
  // const points2 = usePoints({
  //   data: voltsView,
  //   style: {
  //     fillStyle: 'hsl(210, 100%, 75%)',
  //     strokeStyle: 'hsl(210, 100%, 50%)',
  //   },
  // });

  // const animations: CanvasEffect[] = [
  //   updateZoomedScale,
  //   updateAmpsView,
  //   updateVoltsView,
  //   clear,
  //   useTicks({ viewScale }),
  //   // outside(dashed(line), dashed(line2)),
  //   inside(
  //     // line,
  //     points(useLabels({ data: ampsView, scaleY })),
  //     // line2,
  //     points2(useLabels({ data: voltsView, scaleY: scaleY2 }))
  //   ),
  //   useFPS({
  //     offset: { x: { height: -0.1 }, y: { height: -0.9 } },
  //     style: { fillStyle: 'hsl(90, 75%, 50%)' },
  //   }),
  // ];

  // // let n = 0;
  // useAnimationFrame(
  //   ts => {
  //     const { ctx } = getContext(props.canvasRef);
  //     animations.forEach(e => e(ctx));
  //     // console.log('frame:', ++n, 'ts:', ts);
  //   }
  //   // ,{ batch: 0, interval: 500 }
  // );

  // return null;
});
