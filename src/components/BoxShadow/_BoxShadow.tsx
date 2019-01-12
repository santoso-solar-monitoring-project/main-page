import React, { useCallback } from 'react';
import Imm from 'immutable';
import { EnhancedContext } from 'utils/canvas/enhanceContext';
import { GoodCanvasChildPropsType } from 'components/GoodCanvas';
import propagateProps from 'utils/propagateProps';

// Same meaning as for CSS box-shadow
export interface _BoxShadowPropsType extends GoodCanvasChildPropsType {
  spreadRadius: number;
  blurRadius: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

const defaultProps: Partial<_BoxShadowPropsType> = Imm.fromJS({
  spreadRadius: 0,
  blurRadius: 0,
  offsetX: 0,
  offsetY: 0,
  color: 'black',
});

type _BoxShadowType = React.FunctionComponent<typeof defaultProps>;

const _BoxShadow: _BoxShadowType = (props: typeof defaultProps) => {
  // unpack props
  const {
    spreadRadius,
    blurRadius,
    offsetX,
    offsetY,
    color,
    children,
  } = defaultProps.mergeDeep(props).toJS();

  // stateful variables
  const canvasEffects = useCallback(
    (ctx: EnhancedContext) => {
      const { lineWidth = 0 } = ctx;
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.translate(offsetX, offsetY);
      ctx.lineWidth += lineWidth + 2 * spreadRadius;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
    },
    [spreadRadius, blurRadius, offsetX, offsetY, color]
  );

  return (
    <>
      {// Add to canvasEffects
      propagateProps<GoodCanvasChildPropsType>(children, child => {
        const { props: { canvasEffects: prevEffects = () => {} } = {} } = child;

        const newEffects = (ctx: EnhancedContext) => {
          prevEffects(ctx);
          canvasEffects(ctx);
        };

        return { canvasEffects: newEffects };
      })}
    </>
  );
};

_BoxShadow.defaultProps = defaultProps.toJS();
export default _BoxShadow;
