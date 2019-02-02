import React from 'react';
import GoodCanvas from 'components/GoodCanvas';
import Corners, { Props } from './Corners';

const CornersTest = (props: typeof Props.propsOut) => {
  const { style, radius } = props;
  return (
    <GoodCanvas style={style}>
      <Corners radius={radius} />
    </GoodCanvas>
  );
};

export default Props.wrap(CornersTest);
