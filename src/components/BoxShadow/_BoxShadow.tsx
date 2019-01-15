import React, { useCallback, useRef } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { ChildProps } from 'components/GoodCanvas';
import { EnhancedContext } from 'utils/canvas';
import propagateProps from 'utils/propagateProps';

// Same meaning as for CSS box-shadow
export interface PropsType extends ChildProps.PropsType {
  spreadRadius: number;
  blurRadius: number;
  offsetX: number;
  offsetY: number;
  color: string;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  spreadRadius: 0,
  blurRadius: 0,
  offsetX: 0,
  offsetY: 0,
  color: 'black',
});

type _BoxShadowType = React.FunctionComponent<DefaultPropsType>;

const _BoxShadow: _BoxShadowType = (props: DefaultPropsType) => {
  // unpack props
  const savedProps = useRef(defaultProps.mergeDeep(props));
  const mergedProps = savedProps.current.mergeDeep(props);
  const children = props.children;

  // stateful variables
  const canvasEffects = useCallback(
    (ctx: EnhancedContext) => {
      // unpack other props (lazily inside here)
      const {
        spreadRadius,
        blurRadius,
        offsetX,
        offsetY,
        color,
      }: DefaultPropsType = mergedProps.toJS();

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
  return propagateProps<PropsType>(children, child => {
    const { props: { canvasEffects: prevEffects = () => {} } = {} } = child;

    const newEffects = (ctx: EnhancedContext) => {
      prevEffects(ctx);
      canvasEffects(ctx);
    };

    return { canvasEffects: newEffects };
  });
};

_BoxShadow.defaultProps = defaultProps.toJS();
export default _BoxShadow;
