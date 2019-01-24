import React, { useCallback, useMemo } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { EnhancedContext } from 'utils/canvas';
import { propagateProps } from 'utils/propagateProps';
import { useImm, withImm } from 'utils/Imm';
import noop from 'utils/noop';

// Same meaning as for CSS box-shadow
export interface Props extends GoodCanvasChild.Props {
  spreadRadius?: number;
  blurRadius?: number;
  offsetX?: number;
  offsetY?: number;
  color?: string;
}

export const defaultProps = {
  spreadRadius: 0,
  blurRadius: 0,
  offsetX: 0,
  offsetY: 0,
  color: 'black',
};

const BoxShadow: React.FunctionComponent<Props> = props => {
  // unpack props
  const { children } = props;
  const mergedProps = withImm.merge(defaultProps, props);

  // stateful variables
  const canvasEffects = useImm(useCallback)(
    (ctx: EnhancedContext) => {
      const { spreadRadius, blurRadius, offsetX, offsetY, color } = mergedProps;

      const { lineWidth = 0 } = ctx;
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.translate(offsetX!, offsetY!);
      ctx.lineWidth += lineWidth + 2 * spreadRadius!;
      ctx.fillStyle = color!;
      ctx.strokeStyle = color!;
    },
    [mergedProps]
  );

  // append a new effect to canvasEffects prop of children
  const styledChildren = useImm(useMemo)(
    () => {
      return propagateProps<Props>(children, child => {
        const { canvasEffects: prevEffects = noop } = child.props || {};

        const newEffects = (ctx: EnhancedContext) => {
          prevEffects(ctx);
          canvasEffects(ctx);
        };

        return { canvasEffects: newEffects };
      });
    },
    [children, canvasEffects]
  );

  return (
    <>
      {styledChildren}
      {children}
    </>
  );
};

export default BoxShadow;
