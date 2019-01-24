import React, { useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import { withImm } from 'utils/Imm';
import { GoodCanvasChild } from 'components/GoodCanvas';
import * as Anim from 'components/Animatable';
import { Pair } from 'utils/Pair';
import evaluate from 'utils/evaluate';

export interface Props extends GoodCanvasChild.Props, Anim.Props {
  data: React.RefObject<Pair[]>;
  line?: d3.Line<Pair>;
}

export const defaultProps = {
  // alpha = 0.5 gives centripetal CatmullRom
  line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))',
  canvasStyle: {
    lineWidth: 1,
    strokeStyle: 'hsl(330, 100%, 67%)',
  },
};

const Line: React.FunctionComponent<Props> = props => {
  const { line: theLine, canvasStyle } = withImm.merge(defaultProps, props);
  const line = useMemo(
    () => (typeof theLine === 'string' ? evaluate(theLine, { d3 }) : theLine),
    [theLine]
  );

  useEffect(() => {
    const { data, subscribe, canvasEffects } = props;

    console.log('Line USEEFFECT');
    const animate: Anim.Animate = ({ ctx }) => {
      // console.log('Line ANIMATE', data!.current);
      // attach context to line
      line.context(ctx);
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
      // draw the line
      ctx.beginPath();
      line(data!.current);
      ctx.stroke();
    };
    return subscribe!(animate);
  });

  return null;
};

export default Line;
