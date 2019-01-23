import React, {
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import * as d3 from 'd3';
import Imm, { ImmMapType } from 'utils/Imm';
import { GoodCanvasElement, ChildProps } from 'components/GoodCanvas';
import * as Animatable from 'components/Animatable';
import { getContext, EnhancedContext } from 'utils/canvas';
import Points from 'components/Points';
import Line from 'components/Line';
import { PairType } from 'utils/Pair';
import { useCounter, useDataBufferSilent } from 'utils/CustomHooks';
import { useBigBuffer } from './useBigBuffer';

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
  // TODO: interpolate this value:
  const samplePeriod = useRef(500); // milliseconds
  const buffer = useBigBuffer({ samplePeriod, maxSize: 10000 });

  const { canvasRef } = props;
  const [loop, subscribe] = Animatable.useAnimationLoop(canvasRef!);

  const output = useRef<PairType[]>([]);
  const timespan = useRef(7000); // milliseconds
  const seekEnd = useRef((now: number) => now); // milliseconds
  // const seekEnd = useRef((t: number) => 500 * (CURRENT.length - 1)); // milliseconds

  // TODO: figure out how to abstract this animation stuff to be a reusable hook

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
