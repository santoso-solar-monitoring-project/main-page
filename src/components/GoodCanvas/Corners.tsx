import React, { useEffect } from 'react';
import Imm from 'immutable';
import { GoodCanvasChildPropsType } from '.';
import { getContext } from 'utils/canvas';

export interface CornersPropsType extends GoodCanvasChildPropsType {}

const defaultProps: Partial<CornersPropsType> = Imm.fromJS({});

type CornersType = React.FunctionComponent<typeof defaultProps>;

const Corners: CornersType = (props: typeof defaultProps) => {
  // unpack props
  const { canvasRef, canvasNeedsUpdate } = defaultProps.mergeDeep(props).toJS();

  useEffect(
    () => {
      const { canvas, ctx } = getContext(canvasRef!);
      const dims = canvas.dims;
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(5, 5, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(dims.width - 5, 5, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(dims.width - 5, dims.height - 5, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = 'magenta';
      ctx.beginPath();
      ctx.arc(5, dims.height - 5, 5, 0, 2 * Math.PI);
      ctx.fill();
    },
    [canvasNeedsUpdate]
  );

  return null;
};

Corners.defaultProps = defaultProps.toJS();
export default Corners;
