import React, { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import Imm, { ImmMapType } from 'utils/Imm';
import GoodCanvas, { GoodCanvasElement } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import Points from 'components/Points';
import Line from 'components/Line';
import { BasePropsType } from 'utils/BaseProps';
import { PairType } from 'utils/Pair';
import { useCounter, useDataBuffer } from 'utils/CustomHooks';
import isValidRefObject from 'utils/isValidRefObject';

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];

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
const [lo, hi] = [Math.min(...CURRENT), Math.max(...CURRENT)];
const generate = (): PairType => [Date.now(), Math.random() * (hi - lo) + lo];

const initialValue = CURRENT.map((v, i): PairType => [i * 500, v]);

type IVPlotType = React.FunctionComponent<DefaultPropsType>;

const IVPlot: IVPlotType = (props: DefaultPropsType) => {
  // animation variables
  const [frameNumber, nextFrame] = useCounter();

  // subscribe to data
  const [buffer, concat] = useDataBuffer<PairType>({ maxSize: 10000 });
  const samplePeriod = useRef(500); // milliseconds
  useEffect(() => {
    const id = window.setInterval(() => {
      concat([generate()]);
    }, 250 + Math.random() * 500);
    return () => window.clearInterval(id);
  }, []);

  // initialize axes scales
  const canvasRef = useRef<GoodCanvasElement>(null);
  const [needsResize, notify] = useCounter();
  const scaleX = useMemo(() => d3.scaleLinear(), []);
  const scaleY = useMemo(() => d3.scaleLinear(), []);
  useLayoutEffect(
    () => {
      const { canvas } = getContext(canvasRef);
      scaleX.range([0, canvas.dims.width]);
      scaleY.range([0, canvas.dims.height]);
      const { ctx } = getContext(canvasRef);
      (window as any).ctx = ctx;
    },
    [needsResize]
  );

  // transform view selection of buffer for output
  const output = useRef<PairType[]>([]);
  const timespan = useRef(7000); // milliseconds
  const seekEnd = useRef((now: number) => now); // milliseconds
  // const seekEnd = useRef((t: number) => 500 * (CURRENT.length - 1)); // milliseconds
  const bisector = useMemo(() => d3.bisector((d: PairType) => d[0]), []);
  useEffect(
    () => {
      // Set end time and x-axis scaling.
      const endTime = seekEnd.current(Date.now());
      scaleX.domain([endTime - timespan.current, endTime]);

      // Get current view of buffer
      const searchFrom = Math.max(
        0,
        buffer.length - (1.5 * timespan.current) / samplePeriod.current
      );
      const startTime = endTime - timespan.current;
      const start = bisector.left(buffer, startTime, searchFrom);
      const view: PairType[] = buffer.slice(start);

      // Set y-axis scaling for view
      // scaleY.domain(d3.extent(view, d => d[1]) as PairType);
      scaleY.domain([lo, hi] as PairType);

      // output view in scaled (canvas) coordinates
      output.current = view.map(([x, y]): PairType => [scaleX(x), scaleY(y)]);

      requestAnimationFrame(nextFrame);
    },
    [frameNumber]
  );

  if (isValidRefObject(canvasRef)) {
    const {
      canvas: {
        dims: { width, height },
      },
      ctx,
    } = getContext(canvasRef);
    ctx.clearRect(0, 0, width, height);
  }

  // unpack props
  const { style }: DefaultPropsType = defaultProps.mergeDeep(props).toJS();

  return (
    <GoodCanvas
      style={style}
      // showWarnings={true}
      notify={notify}
      ref={canvasRef}
    >
      <Line data={output.current} />
      <Points data={output.current} />
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
