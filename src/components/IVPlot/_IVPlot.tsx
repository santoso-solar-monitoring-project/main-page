import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import * as d3 from 'd3';
import Imm, { ImmMapType } from 'utils/Imm';
import {
  GoodCanvasElement,
  ChildProps,
  Animatable,
} from 'components/GoodCanvas';
import { getContext, EnhancedContext } from 'utils/canvas';
import Points from 'components/Points';
import Line from 'components/Line';
import { PairType } from 'utils/Pair';
import { useCounter, useDataBufferSilent } from 'utils/CustomHooks';

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];
const [lo, hi] = [Math.min(...CURRENT), Math.max(...CURRENT)];
const generate = (): PairType => [Date.now(), Math.random() * (hi - lo) + lo];

const initialValue = CURRENT.map((v, i): PairType => [i * 500, v]);

export interface PropsType extends ChildProps.PropsType {
  // [STEP 5] prop types...,
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  // [STEP 6] default props...,
});

type _IVPlotType = React.FunctionComponent<DefaultPropsType>;

const _IVPlot: _IVPlotType = props => {
  // subscribe to data
  const [buffer, concatToBuffer] = useDataBufferSilent<PairType>({
    maxSize: 10000,
    // initialValue,
  });
  // TODO: interpolate this value:
  const samplePeriod = useRef(500); // milliseconds
  useEffect(() => {
    const updateData = () => {
      concatToBuffer([generate()]);
      setTimeout(updateData, 250 + Math.random() * 500);
    };
    updateData();
  }, []);

  const {
    canvasRef,
    canvasStyle,
    canvasEffects,
    canvasNeedsUpdate,
  }: DefaultPropsType = props;

  // initialize axes scales
  const scaleX = useMemo(() => d3.scaleLinear(), []);
  const scaleY = useMemo(() => d3.scaleLinear(), []);
  useEffect(
    () => {
      const { canvas } = getContext(canvasRef!);
      scaleX.range([0, canvas.dims.width]);
      scaleY.range([0, canvas.dims.height]);
    },
    [canvasNeedsUpdate]
  );

  // transform view selection of buffer for output
  const output = useRef<PairType[]>([]);
  // TODO: calculate based on canvas width
  const timespan = useRef(7000); // milliseconds
  const seekEnd = useRef((now: number) => now); // milliseconds
  // const seekEnd = useRef((t: number) => 500 * (CURRENT.length - 1)); // milliseconds
  const bisector = useMemo(() => d3.bisector((d: PairType) => d[0]), []);

  const transform = useCallback<Animatable.FuncType>(
    () => {
      // Set end time and x-axis scaling.
      const end = seekEnd.current(Date.now());
      const start = end - timespan.current;
      const pad = 1500;
      scaleX.domain([start + pad, end - pad]);

      // Get current view of buffer
      const searchFrom = Math.max(
        0,
        Math.ceil(
          buffer.length - (1.5 * timespan.current) / samplePeriod.current
        )
      );
      const left = bisector.left(buffer, start, searchFrom);
      const view: PairType[] = buffer.slice(left);

      // Set y-axis scaling for view
      // scaleY.domain(d3.extent(view, d => d[1]) as PairType);
      scaleY.domain([lo, hi] as PairType);

      // output view in scaled (canvas) coordinates
      output.current = view.map(([x, y]): PairType => [scaleX(x), scaleY(y)]);
      // console.log('DATA TRANSFORM ANIMATE', output.current);
    },
    [seekEnd.current, timespan]
  );

  // TODO: figure out how to abstract this animation stuff to be a reusable hook
  const [animationLoop, concatToAnimationLoop] = useDataBufferSilent<{
    animate?: Animatable.FuncType;
  }>();

  const subscribe: Animatable.PropsType['subscribe'] = useCallback(animate => {
    console.log('subscribed');
    const animation = { animate };
    concatToAnimationLoop([animation]);
    return () => {
      console.log('deleting');
      delete animation.animate;
    };
  }, []);

  useEffect(() => {
    const { canvas, ctx } = getContext(canvasRef!);
    let id: number;
    let last = performance.now();
    const globalLoop = (now: number) => {
      const args = { canvas, ctx, delta: now - last };
      const dead: number[] = [];
      // console.log('globalLoop running...', animationLoop.length);
      animationLoop.forEach(({ animate }, i) => {
        if (animate) {
          ctx.save();
          animate(args);
          ctx.restore();
        } else {
          console.log('finalizing delete...');
          dead.push(i);
        }
      });
      // subtract j because j elements before have already been removed...
      dead.forEach((x, j) => animationLoop.removeOne(x - j));
      last = now;
      id = requestAnimationFrame(globalLoop);
      // id = window.setTimeout(globalLoop, 1000);
    };
    id = requestAnimationFrame(globalLoop);
    // id = window.setTimeout(globalLoop, 1000);
    return () => cancelAnimationFrame(id);
    // return () => window.clearTimeout(id);
  }, []);

  /* 
    TODO: Refactor all of these below into separate components.
  */
  useLayoutEffect(() => {
    const clear: Animatable.FuncType = ({ canvas, ctx }) => {
      ctx.fillRect(0, 0, canvas!.dims.width, canvas!.dims.height);
    };
    console.log('_IVPLOT USELAYOUTEFFECT 1');
    return subscribe(clear);
  }, []);

  useLayoutEffect(() => {
    console.log('_IVPLOT USELAYOUTEFFECT 2');
    return subscribe(transform);
  }, []);

  useLayoutEffect(() => {
    console.log('_IVPLOT USELAYOUTEFFECT 3');
    function getIIRDecay(
      cutoffFrequency: number,
      deltaT: number,
      useExponential = true
    ) {
      // time constant
      const tau = 1 / (2 * Math.PI * cutoffFrequency);

      if (useExponential) return Math.exp(-deltaT / tau);
      else return tau / (deltaT + tau);
    }
    let fps = 1;
    const FPS_THRESHOLD = 200; // (ms) ~ 5fps
    const FPS_LOW_THRESHOLD = 10; // (ms) ~ 100fps
    const setFPS: Animatable.FuncType = ({ canvas, ctx, delta }) => {
      const DECAY = getIIRDecay(1 / 4, delta / 1000);
      console.assert(isFinite(delta), '1');
      console.assert(isFinite(DECAY), '2');
      console.assert(DECAY <= 1, '3');
      if (delta < FPS_LOW_THRESHOLD) return;
      if (delta > FPS_THRESHOLD) fps = 1000 / delta;
      else fps = DECAY * fps + ((1 - DECAY) * 1000) / delta;
      if (isNaN(fps)) fps = 0;
      ctx.font = `20px ubuntu mono`;
      ctx.fillStyle = 'white';
      const text = `${fps.toFixed(1)} FPS`;
      const { width } = ctx.measureText(text);
      ctx.fillText(text, canvas.dims.width - width - 5, canvas.dims.height - 5);
    };
    return subscribe(setFPS);
  }, []);

  return (
    <>
      <Line
        data={output}
        {...{ subscribe, canvasRef, canvasStyle, canvasEffects }}
      />
      <Points
        data={output}
        {...{ subscribe, canvasRef, canvasStyle, canvasEffects }}
      />
    </>
  );
};

_IVPlot.defaultProps = defaultProps.toJS();
export default _IVPlot;
