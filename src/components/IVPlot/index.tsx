import React, { useEffect, useState, useRef } from 'react';
import Imm from 'immutable';
import * as d3 from 'd3';
import GoodCanvas, { GoodCanvasType } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import Points from 'components/Points';
import Line from 'components/Line';
import { PropsType } from 'utils/PropsType';
import { PairType } from 'utils/PairType';

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];
/* const CURRENTBufferRef = useRef<number[]>([]);
  const subscribeData = () =>
    // fake it for now
    {
      // wait for initial subscription to succeed
      setTimeout(() => {
        // some code for when the subscription succeeds
        CURRENTBufferRef.CURRENT = CURRENT;
      }, 100);
      setInterval();

      function consumeNewData (data) {
        // rotate front element to back
        const dataSource = CURRENT;
        CURRENT.push(CURRENT.shift()!);
      };
    }; */

/* 
      Play state algorithm:
  
      1. draw rounded box background in CSS
      2. scale and translate canvas origin to match box
      3. set up clip path to match box
      4. get frame translate offset
      5. slice glow line data
      6. make d3 scales
      7. render tick lines
      8. render glow lines
      9. render dashed fringe lines
      10. render points
      11. unset clip path
      12. position and render point labels
   */

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

export interface IVPlotPropsType extends PropsType {}

const defaultProps: Partial<IVPlotPropsType> = Imm.fromJS({
  style: {
    width: '500px',
    height: '300px',
    borderRadius: '4px',
    border: '40px solid blue',
    backgroundColor: 'black',
  },
});

type IVPlotType = React.FunctionComponent<typeof defaultProps>;

const IVPlot: IVPlotType = (props: typeof defaultProps) => {
  // stateful variables
  const [data, setData] = useState([] as PairType[]);
  const canvasRef = useRef<GoodCanvasType>(null);

  // unpack props
  const { style } = defaultProps.mergeDeep(props).toJS();

  // prepare data
  useEffect(() => {
    /* const { canvas } = getContext(canvasRef);
    const x = d3.range(CURRENT.length);
    const y = CURRENT;
    const scaleX = d3
      .scaleLinear()
      .domain(d3.extent(x) as PairType)
      .range([0, canvas.dims.width]);
    const scaleY = d3
      .scaleLinear()
      .domain(d3.extent(y) as PairType)
      .range([0, canvas.dims.height]);
    const _data = d3
      .zip(x, y)
      .map(([x, y]) => [scaleX(x), scaleY(y)]) as PairType[];
    setData(_data); */
  }, []);
  console.log('hi');
  /* 
  // canvasStyle={lightMode.current.line.canvasStyle}
        // glow={lightMode.current.line.glow}
  */
  return (
    <GoodCanvas style={{ ...style /* ...lightMode.style */ }} ref={canvasRef}>
      {/* <> */}
      {/* Current */}
      {/* <Line data={data} /> */}
      {/* <Points data={data} /> */}
      {
        // canvasStyle={lightMode.current.points.canvasStyle}
        // glow={lightMode.current.points.glow}
      }
      {/* </> */}
    </GoodCanvas>
  );
};

IVPlot.defaultProps = defaultProps.toJS();
export default IVPlot;
