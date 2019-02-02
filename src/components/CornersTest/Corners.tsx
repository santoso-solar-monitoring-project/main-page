import { useEffect } from 'react';
import { getContext } from 'utils/canvas';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { declare } from 'utils/DefaultProps';

export const Props = declare(
  class {
    static defaults = {
      radius: 100,
    };
  },
  GoodCanvasChild.Props
);

const Corners: React.FC<typeof Props.propsOut> = props => {
  useEffect(() => {
    const { canvasRef, canvasStyle, canvasEffects, radius } = props;
    const { canvas, ctx } = getContext(canvasRef);
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

export default Props.wrap(Corners);
