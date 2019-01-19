import React, { useMemo } from 'react';
import * as d3 from 'd3';
import Imm, { ImmMapType } from 'utils/Imm';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';
import { PairType } from 'utils/Pair';
import evaluate from 'utils/evaluate';
import isValidRefObject from 'utils/isValidRefObject';

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
  const theLine = mergedProps.get('line');
  const line = useMemo(
    () => (typeof theLine === 'string' ? evaluate(theLine, { d3 }) : theLine),
    [theLine]
  );

  const {
    data,
    canvasRef,
    canvasStyle,
    canvasEffects,
  }: DefaultPropsType = mergedProps.toJS();
  if (!isValidRefObject(canvasRef)) return null;

  const { ctx } = getContext(canvasRef!);
  // console.log('Line RENDER', (window as any).frameNumber);
  // attach context to line
  line.context(ctx);
  ctx.save();
  Object.assign(ctx, canvasStyle);
  if (canvasEffects) canvasEffects(ctx);

  // draw the line
  ctx.beginPath();
  line(data);
  ctx.stroke();
  ctx.restore();

  return null;
};

Line.defaultProps = defaultProps.toJS();
export default Line;
