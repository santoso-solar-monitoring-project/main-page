import React from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { useImmEffect } from 'utils/CustomHooks';
import { getContext } from 'utils/canvas';
import { ChildProps } from 'components/GoodCanvas';

export interface PropsType extends ChildProps.PropsType {}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({});

type CornersType = React.FunctionComponent<DefaultPropsType>;

const Corners: CornersType = (props: DefaultPropsType) => {
  // merge props
  const mergedProps = defaultProps.mergeDeep(props);

  useImmEffect(
    () => {
      // unpack props
      const {
        canvasRef,
        canvasStyle,
        canvasEffects,
      }: DefaultPropsType = mergedProps.toJS();
      const { canvas, ctx } = getContext(canvasRef!);
      ctx.save();
      Object.assign(ctx, canvasStyle);
      if (canvasEffects) canvasEffects(ctx);
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
      ctx.restore();
    },
    [mergedProps]
  );

  return null;
};

Corners.defaultProps = defaultProps.toJS();
export default Corners;
