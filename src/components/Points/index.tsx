import React, { useEffect } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';
import * as Animatable from 'components/Animatable';
import { PairType } from 'utils/Pair';

interface PropsType extends ChildProps.PropsType, Animatable.PropsType {
  data: React.RefObject<PairType[]>;
  radius: number;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  radius: 3,
  canvasStyle: {
    fillStyle: 'hsl(330, 100%, 75%)',
    strokeStyle: 'hsl(330, 100%, 50%)',
    lineWidth: 0.5,
  },
});

/* 
{
  offsetX: 0,
  offsetY: 0,
  blurRadius: 5,
  spreadRadius: 0.5,
  // use alpha = 0.5 for light-mode
  color: 'hsl(330, 100%, 50%)',
}
*/
type PointsType = React.FunctionComponent<DefaultPropsType>;

const Points: PointsType = props => {
  // merge props
  const mergedProps = defaultProps.mergeDeep(props);

  useEffect(() => {
    // unpack props
    const {
      // data,
      radius,
      subscribe,
      canvasStyle,
      canvasEffects,
    }: DefaultPropsType = mergedProps.toJS();
    const { data } = props;

    console.log('Points USEEFFECT');
    const animate: Animatable.FuncType = ({ ctx }) => {
      // console.log('Points ANIMATE', data!.current);
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
      // draw points
      for (const [x, y] of data!.current || []) {
        ctx.beginPath();
        ctx.arc(x, y, radius!, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    };
    return subscribe!(animate);
  });

  return null;
};

Points.defaultProps = defaultProps.toJS();
export default Points;
