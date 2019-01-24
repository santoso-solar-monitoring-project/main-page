import { useEffect, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { GoodCanvasChild } from 'components/GoodCanvas';
import * as Animatable from 'components/Animatable';
import { getContext } from 'utils/canvas';
import { Pair } from 'utils/Pair';

export interface Args extends GoodCanvasChild.OwnProps {
  input: Pair[];
  output: Pair[];
}

export function useScaleX(args: Args) {
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

  const animate = useCallback<Animatable.Animate>(() => {
    // Set y-axis scaling for view
    // scaleY.domain(d3.extent(view, d => d[1]) as PairType);
    scaleY.domain([lo, hi] as Pair);
  }, []);
}
