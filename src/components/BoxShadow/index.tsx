import React, { useCallback, useMemo } from 'react';
import { GoodCanvasChild } from 'components/GoodCanvas';
import { EnhancedContext } from 'utils/canvas';
import { propagateProps } from 'utils/propagateProps';
import { useImm } from 'utils/Imm';
import { declare } from 'utils/DefaultProps';

export const Props = declare(
  class {
    static defaults = {
      spreadRadius: 0,
      blurRadius: 0,
      offsetX: 0,
      offsetY: 0,
      color: 'black',
    };
  },
  GoodCanvasChild.Props
);

const BoxShadow: React.FunctionComponent<typeof Props.propsOut> = props => {
  // unpack props
  const { children, ...rest } = props;
  const { spreadRadius, blurRadius, offsetX, offsetY, color } = rest;

  // stateful variables
  const canvasEffects = useImm(useCallback)(
    (ctx: EnhancedContext) => {
      const { lineWidth = 0 } = ctx;
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.translate(offsetX!, offsetY!);
      ctx.lineWidth += lineWidth + 2 * spreadRadius!;
      ctx.fillStyle = color!;
      ctx.strokeStyle = color!;
    },
    [rest]
  );

  // append a new effect to canvasEffects prop of children
  const styledChildren = useImm(useMemo)(
    () => {
      return propagateProps<typeof GoodCanvasChild.OwnProps.propsIn>(
        children,
        child => {
          const { canvasEffects: prevEffects } = GoodCanvasChild.OwnProps(
            child.props
          );

          const newEffects = (ctx: EnhancedContext) => {
            prevEffects(ctx);
            canvasEffects(ctx);
          };

          return { canvasEffects: newEffects };
        }
      );
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
