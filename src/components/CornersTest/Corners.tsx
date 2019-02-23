import { useEffect } from 'react';
import { getContext } from 'utils/canvas';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { defaults, declare } from 'utils/DefaultProps';
import { BaseProps } from 'utils/BaseProps';

export const Props = declare(
  defaults({
    radius: 100,
  }),
  BaseProps,
  GoodCanvasChild
);

const Corners: React.FC<typeof Props.propsOut> = props => {
  useEffect(() => {
    const { canvasRef, radius } = props;
    const { canvas, ctx } = getContext(canvasRef);
    const { width, height } = canvas.dims;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

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
