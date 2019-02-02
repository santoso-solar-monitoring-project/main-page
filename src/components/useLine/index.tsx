import { useMemo } from 'react';
import * as d3 from 'd3';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { Pair } from 'utils/Pair';
import evaluate from 'utils/evaluate';
import { declare } from 'utils/DefaultProps';
import { getContext } from 'utils/canvas';

export const Args = declare(
  class {
    static defaults = {
      data: [] as Pair[],
      // alpha = 0.5 gives centripetal CatmullRom
      line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))' as
        | d3.Line<Pair>
        | string,
      canvasStyle: {
        lineWidth: 1,
        strokeStyle: 'hsl(330, 100%, 67%)',
      } as typeof GoodCanvasChild.Props.propsOut.canvasStyle,
    };
  },
  GoodCanvasChild.Props
);

function useLine(args: typeof Args.propsOut) {
  const { data, line: theLine, canvasRef, canvasStyle, canvasEffects } = args;
  const line = useMemo(
    () => (typeof theLine === 'string' ? evaluate(theLine, { d3 }) : theLine),
    [theLine]
  );

  if (canvasRef.current) {
    const { ctx } = getContext(canvasRef);
    ctx.isolate(() => {
      // attach context to line
      line.context(ctx);
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
      // draw the line
      ctx.beginPath();
      line(data);
      ctx.stroke();
    });
  }
}

export default Args.wrap(useLine);
