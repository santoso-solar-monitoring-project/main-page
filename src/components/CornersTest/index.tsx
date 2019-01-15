import React from 'react';
import GoodCanvas from 'components/GoodCanvas';
import Corners from './Corners';
import { BasePropsType } from 'utils/BaseProps';

export interface PropsType extends BasePropsType {}

type CornersTestType = React.FunctionComponent<PropsType>;

const CornersTest: CornersTestType = (props: PropsType) => {
  return (
    <GoodCanvas {...props} showWarnings={true}>
      {/* Corners will get a reference to the canvas automatically. */}
      <Corners />
    </GoodCanvas>
  );
};

export default CornersTest;
