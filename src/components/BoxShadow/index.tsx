import React from 'react';
import Imm from 'immutable';
import _BoxShadow, { _BoxShadowPropsType } from './_BoxShadow';

export interface BoxShadowPropsType extends _BoxShadowPropsType {}

const defaultProps: Partial<BoxShadowPropsType> = Imm.fromJS(
  _BoxShadow.defaultProps
);

type BoxShadowType = React.FunctionComponent<typeof defaultProps>;

const BoxShadow: BoxShadowType = (props: typeof defaultProps) => {
  // unpack props
  const { children, ...rest } = defaultProps.mergeDeep(props).toJS();

  return (
    <>
      <_BoxShadow {...rest}>{children}</_BoxShadow>
      {React.Children.map(children, child => React.cloneElement(child))}
    </>
  );
};

BoxShadow.defaultProps = defaultProps.toJS();
export default BoxShadow;
