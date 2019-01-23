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
import { PairType } from 'utils/Pair';

export interface ArgsType extends ChildProps.OwnPropsType {
  input: React.RefObject<PairType[]>;
  seekEnd: React.RefObject<(now: number) => number>;
  timespan: React.RefObject<number>;
  output: React.MutableRefObject<PairType[]>;
}

export function useScaleX(args: ArgsType) {
  const { canvasRef, canvasNeedsUpdate } = args;
  const { input, seekEnd, timespan, output } = args;

  // initialize axes scales
  const scaleX = useMemo(() => d3.scaleLinear(), []);
  useEffect(
    () => {
      const { canvas } = getContext(canvasRef!);
      scaleX.range([0, canvas.dims.width]);
    },
    [canvasNeedsUpdate]
  );

  // transform view selection of input for output
  // TODO: calculate based on canvas width (maintain a given speed)

  const bisector = useMemo(() => d3.bisector((d: PairType) => d[0]), []);

  const animate = useCallback<Animatable.FuncType>(
    () => {
      // Set end time and x-axis scaling.
      const end = seekEnd.current!(Date.now());
      const start = end - timespan.current;
      // TODO: calculate based on canvas width
      const pad = 1500;
      scaleX.domain([start + pad, end - pad]);

      // Get current view of input
      const searchFrom = Math.max(
        0,
        Math.ceil(
          input.current.length - (1.5 * timespan.current) / samplePeriod.current
        )
      );
      const left = bisector.left(input.current, start, searchFrom);
      const view: PairType[] = input.current.slice(left);
    },
    [seekEnd.current, timespan]
  );
}

// output.current = view.map(([x, y]): PairType => [scaleX(x), scaleY(y)]);
