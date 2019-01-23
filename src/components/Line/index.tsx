import React, { useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import Imm, { ImmMapType } from 'utils/Imm';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';
import * as Animatable from 'components/Animatable';
import { PairType } from 'utils/Pair';
import evaluate from 'utils/evaluate';

export interface PropsType extends ChildProps.PropsType, Animatable.PropsType {
  data: React.RefObject<PairType[]>;
  line: d3.Line<PairType>;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
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

  useEffect(() => {
    const {
      subscribe,
      canvasStyle,
      canvasEffects,
    }: DefaultPropsType = mergedProps.toJS();
    const { data } = props;

    console.log('Line USEEFFECT');
    const animate: Animatable.FuncType = ({ ctx }) => {
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

Line.defaultProps = defaultProps.toJS();
export default Line;
