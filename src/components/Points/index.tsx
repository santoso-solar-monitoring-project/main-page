import React, { useEffect } from 'react';
import { withImm } from 'utils/Imm';
import { GoodCanvasChild } from 'components/GoodCanvas';
import * as Anim from 'components/Animatable';
import { Pair } from 'utils/Pair';

export interface Props extends GoodCanvasChild.Props, Anim.Props {
  data: React.RefObject<Pair[]>;
  radius: number;
}

export const defaultProps = {
  radius: 3,
  canvasStyle: {
    fillStyle: 'hsl(330, 100%, 75%)',
    strokeStyle: 'hsl(330, 100%, 50%)',
    lineWidth: 0.5,
  },
};

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
const Points: React.FunctionComponent<Props> = props => {
  useEffect(() => {
    // unpack props
    const { radius, canvasStyle } = withImm.merge(defaultProps, props);
    const { data, subscribe, canvasEffects } = props;

    console.log('Points USEEFFECT');
    const animate: Anim.Animate = ({ ctx }) => {
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

export default Points;
