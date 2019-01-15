import React from 'react';
import _BoxShadow, { DefaultPropsType } from './_BoxShadow';

const BoxShadow: typeof _BoxShadow = (props: DefaultPropsType) => {
  return (
    <>
      <_BoxShadow {...props} />
      {props.children}
    </>
  );
};

BoxShadow.defaultProps = _BoxShadow.defaultProps;
export default BoxShadow;
