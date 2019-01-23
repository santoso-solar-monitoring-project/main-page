import { useEffect } from 'react';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';
import { withImm } from 'utils/Imm';

export interface Props extends ChildProps.PropsType {
  radius?: number;
}

export const defaultProps = {
  radius: 100,
};

const Corners: withImm.FC<Props, typeof defaultProps> = (
  props,
  mergedProps
) => {
  useEffect(() => {
    const { canvasRef, canvasStyle, canvasEffects } = props;
    const { radius } = mergedProps;
    const { canvas, ctx } = getContext(canvasRef!);
    const { width, height } = canvas.dims;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    Object.assign(ctx, canvasStyle);
    if (canvasEffects) canvasEffects(ctx);

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(width - radius, radius, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(width - radius, height - radius, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'magenta';
    ctx.beginPath();
    ctx.arc(radius, height - radius, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  });

  return null;
};

export default withImm.bind(defaultProps)(Corners);
