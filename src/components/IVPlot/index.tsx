import React from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import GoodCanvas from 'components/GoodCanvas';
import { BasePropsType } from 'utils/BaseProps';
import _IVPlot from './_IVPlot';

/* interface ModeType {
  style: React.CSSProperties | {};
  current: {
    line: {
      canvasStyle?: CanvasRenderingContext2D | {};
    };
    points: {
      canvasStyle?: CanvasRenderingContext2D | {};
    };
  };
}

export const lightMode: ModeType = {
  style: { backgroundColor: 'transparent' },
  current: {
    line: {
      canvasStyle: { strokeStyle: 'hsl(330, 100%, 75%)' },
      // glow: { blurRadius: 10, color: 'hsl(330, 100%, 50%)' },
    },
    points: {
      canvasStyle: { strokeStyle: 'hsl(330, 100%, 75%)' },
      // glow: { blurRadius: 10, color: 'hsl(330, 100%, 50%)' },
    },
  },
}; */

export interface PropsType extends BasePropsType {}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  style: {
    width: '100%',
    height: '300px',
    borderRadius: '5px',
    // border: '10px solid blue',
    backgroundColor: 'black',
  },
});

type IVPlotType = React.FunctionComponent<DefaultPropsType>;

const IVPlot: IVPlotType = props => {
  // unpack props
  const { style }: DefaultPropsType = defaultProps.mergeDeep(props).toJS();

  return (
    <GoodCanvas style={style} showWarnings={true}>
      <_IVPlot />
    </GoodCanvas>
  );
};

IVPlot.defaultProps = defaultProps.toJS();
export default IVPlot;

/* 
// canvasStyle={lightMode.current.line.canvasStyle}
      // glow={lightMode.current.line.glow}
*/
// blur={{ radius: 10 }}
// canvasStyle={lightMode.current.points.canvasStyle}
// glow={lightMode.current.points.glow}
