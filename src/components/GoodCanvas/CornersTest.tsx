import React from 'react';
import Imm from 'immutable';
import GoodCanvas from '.';
import Corners from './Corners';
import { PropsType } from 'utils/PropsType';

export interface CornersTestPropsType extends PropsType {}

const defaultProps: Partial<CornersTestPropsType> = Imm.fromJS({
  style: {},
});

type CornersTestType = React.FunctionComponent<typeof defaultProps>;

const CornersTest: CornersTestType = (props: typeof defaultProps) => {
  // unpack props
  const { style } = defaultProps.mergeDeep(props).toJS();

  return (
    <GoodCanvas style={style}>
      {/* Corners will get a reference to the canvas automatically. */}
      <Corners />
    </GoodCanvas>
  );
};

CornersTest.defaultProps = defaultProps.toJS();
export default CornersTest;
