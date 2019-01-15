import React from 'react';
import * as d3 from 'd3';
import Imm, { ImmMapType } from 'utils/Imm';
import useImmEffect from 'utils/useImmEffect';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';
import { PairType } from 'utils/Pair';
import evaluate from 'utils/evaluate';

export interface PropsType extends ChildProps.PropsType {
  data: PairType[];
  line: d3.Line<PairType>;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  data: [],
  // alpha = 0.5 gives centripetal CatmullRom
  line: 'd3.line().curve(d3.curveCatmullRom.alpha(0.5))',
  canvasStyle: {
    lineWidth: 1,
    strokeStyle: 'hsl(330, 100%, 67%)',
  },
});

type LineType = React.FunctionComponent<DefaultPropsType>;

const Line: LineType = (props: DefaultPropsType) => {
  // merge props
  const mergedProps = defaultProps.mergeDeep(props);

  useImmEffect(
    () => {
      // unpack props
      const {
        data,
        line,
        canvasRef,
        canvasStyle,
        canvasEffects,
      }: DefaultPropsType = mergedProps.toJS();
      const theLine = typeof line === 'string' ? evaluate(line, { d3 }) : line;
      const { ctx } = getContext(canvasRef!);
      console.log('Line USEEFFECT', data!.length);
      // attach context to line
      theLine.context(ctx);
      ctx.save();
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);

      // draw the line
      ctx.beginPath();
      theLine(data);
      ctx.stroke();
      ctx.restore();
    },
    [mergedProps]
  );

  return null;
};

Line.defaultProps = defaultProps.toJS();
export default Line;
