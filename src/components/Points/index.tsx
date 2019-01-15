import React from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import useImmEffect from 'utils/useImmEffect';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';
import { PairType } from 'utils/Pair';

interface PropsType extends ChildProps.PropsType {
  data: PairType[];
  radius: number;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  data: [],
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

const Points: PointsType = (props: DefaultPropsType) => {
  // merge props
  const mergedProps = defaultProps.mergeDeep(props);

  useImmEffect(
    () => {
      // unpack props
      const {
        data,
        radius,
        canvasRef,
        canvasStyle,
        canvasEffects,
      }: DefaultPropsType = mergedProps.toJS();
      console.log('Points USEEFFECT', data!.length);
      const { ctx } = getContext(canvasRef!);
      ctx.save();
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);

      // draw points
      for (const [x, y] of data!) {
        ctx.beginPath();
        ctx.arc(x, y, radius!, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    },
    [mergedProps]
  );

  return null;
};

Points.defaultProps = defaultProps.toJS();
export default Points;
