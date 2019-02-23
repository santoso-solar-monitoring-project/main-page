import React from 'react';
import GoodCanvas from 'components/GoodCanvas';
import { StyleProp } from 'utils/BaseProps';
import { _IVPlot } from './_IVPlot';
import { declare, defaults } from 'utils/DefaultProps';
import { FC } from 'utils/easier';

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

export const Props = declare(
  defaults({
    style: {
      width: '100%',
      height: '300px',
      borderRadius: '5px',
      // border: '10px solid blue',
      backgroundColor: 'black',
    },
  }),
  StyleProp
);

const IVPlot: FC<typeof Props.propsOut> = props => {
  // unpack props
  const { style } = props;

  return (
    <GoodCanvas style={style}>
      <_IVPlot />
    </GoodCanvas>
  );
};

export default Props.wrap(IVPlot);

/* 
// canvasStyle={lightMode.current.line.canvasStyle}
      // glow={lightMode.current.line.glow}
*/
// blur={{ radius: 10 }}
// canvasStyle={lightMode.current.points.canvasStyle}
// glow={lightMode.current.points.glow}
