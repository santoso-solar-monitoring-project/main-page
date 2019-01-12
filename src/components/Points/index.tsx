import React, { useEffect } from 'react';
import Imm from 'immutable';
import { GoodCanvasChildPropsType } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { PairType } from 'utils/PairType';

interface PointsPropsType extends GoodCanvasChildPropsType {
  data: PairType[];
  radius: number;
}

const defaultProps: Partial<PointsPropsType> = Imm.fromJS({
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
type PointsType = React.FunctionComponent<typeof defaultProps>;

const Points: PointsType = (props: typeof defaultProps) => {
  // unpack props
  const {
    data,
    radius,
    canvasRef,
    canvasStyle,
    canvasEffects,
    canvasNeedsUpdate,
  } = defaultProps.mergeDeep(props).toJS();

  useEffect(
    () => {
      console.log('Points', data);
      const { ctx } = getContext(canvasRef!);
      ctx.save();
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
      // draw points
      for (const [x, y] of data) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    },
    [canvasNeedsUpdate, data]
  );

  return null;
};

Points.defaultProps = defaultProps.toJS();
export default Points;
