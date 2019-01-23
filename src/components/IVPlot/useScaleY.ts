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
  input: PairType[];
  output: PairType[];
}

export function useScaleX(args: ArgsType) {
  const { canvasRef, canvasNeedsUpdate } = args;
  const { input, output } = args;

  const scaleY = useMemo(() => d3.scaleLinear(), []);
  useEffect(
    () => {
      const { canvas } = getContext(canvasRef!);
      scaleY.range([0, canvas.dims.height]);
    },
    [canvasNeedsUpdate]
  );

  const animate = useCallback<Animatable.FuncType>(() => {
    // Set y-axis scaling for view
    // scaleY.domain(d3.extent(view, d => d[1]) as PairType);
    scaleY.domain([lo, hi] as PairType);
  }, []);
}
