import React, { useEffect, useRef, useLayoutEffect } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import * as d3 from 'd3';
import GoodCanvas, { GoodCanvasElement } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import Points from 'components/Points';
import Line from 'components/Line';
import { BasePropsType } from 'utils/BaseProps';
import { PairType } from 'utils/Pair';
import { useCounter } from 'utils/CustomHooks';

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

export interface PropsType extends BasePropsType {}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  style: {
    width: '500px',
    height: '300px',
    borderRadius: '4px',
    border: '40px solid blue',
    backgroundColor: 'black',
  },
});

type IVPlotType = React.FunctionComponent<DefaultPropsType>;

const IVPlot: IVPlotType = (props: DefaultPropsType) => {
  // stateful variables
  const canvasRef = useRef<GoodCanvasElement>(null);
  const data = useRef<PairType[]>([]);
  const [needsUpdate, notify] = useCounter();

  // unpack props
  const { style }: DefaultPropsType = defaultProps.mergeDeep(props).toJS();

  // subscribe to data
  useEffect(() => {
    const id = window.setInterval(() => {
      CURRENT.push(CURRENT.shift()!);
      notify();
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  // transform data for plotting
  useLayoutEffect(
    () => {
      console.log('IVPlot USELAYOUTEFFECT', data.current.length);
      const { canvas, ctx } = getContext(canvasRef);
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
      data.current = d3
        .zip(x, y)
        .map(([x, y]) => [scaleX(x), scaleY(y)]) as PairType[];
      ctx.clearRect(0, 0, canvas.dims.width, canvas.dims.height);
    },
    [needsUpdate]
  );

  /* 
  // canvasStyle={lightMode.current.line.canvasStyle}
        // glow={lightMode.current.line.glow}
  */
  return (
    <GoodCanvas
      style={{ ...style /* ...lightMode.style */ }}
      ref={canvasRef}
      showWarnings={true}
      notify={notify}
      // blur={{ radius: 10 }}
    >
      {/* <> */}
      {/* Current */}
      <Line data={data.current} />
      <Points data={data.current} />
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
