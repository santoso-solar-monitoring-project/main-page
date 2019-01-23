import React from 'react';
import GoodCanvas from 'components/GoodCanvas';
import Corners, * as CornersNS from './Corners';

const CornersTest = (props: CornersNS.Props) => {
  const { style, radius } = props;
  return (
    <GoodCanvas style={style} showWarnings={true}>
      <Corners radius={radius} />
    </GoodCanvas>
  );
};

export default CornersTest;
