import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import { getContext, useCanvasResizeEffect } from '../../utils/canvas';

const current = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];

function useLine(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const lineRef = useRef(d3.line());
  useEffect(() => {
    const line = lineRef.current;
    const { ctx } = getContext(canvasRef);
    line.context(ctx);
    // alpha = 0.5 gives centripetal CatmullRom
    line.curve(d3.curveCatmullRom.alpha(0.5));
  }, []);
  return lineRef.current;
}

interface GlowLineParams {
  lineWidth?: number;
  shadowBlur?: number;
  strokeStyle?: string;
  shadowColor?: string;
}

type PairType = [number, number];

function drawGlowLine(
  ctx: CanvasRenderingContext2D,
  line: d3.Line<PairType>,
  data: PairType[],
  {
    lineWidth = 5,
    shadowBlur = 25,
    strokeStyle = 'red',
    shadowColor = 'red',
  }: GlowLineParams = {}
) {
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = shadowColor;
  ctx.strokeStyle = strokeStyle;

  ctx.beginPath();
  line(data);
  ctx.stroke();

  ctx.restore();
}

export default function IV_Plot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasResizeEffect(canvasRef);

  const line = useLine(canvasRef);

  /* const currentBufferRef = useRef<number[]>([]);
  const subscribeData = () =>
    // fake it for now
    {
      // wait for initial subscription to succeed
      setTimeout(() => {
        // some code for when the subscription succeeds
        currentBufferRef.current = current;
      }, 100);
      setInterval();

      function consumeNewData (data) {
        // rotate front element to back
        const dataSource = current;
        current.push(current.shift()!);
      };
    }; */

  const init = () => {
    const { canvas, ctx } = getContext(canvasRef);

    const x = d3.range(current.length);
    const y = current;
    const scaleX = d3
      .scaleLinear()
      .domain(d3.extent(x) as PairType)
      .range([0, canvas.width]);
    const scaleY = d3
      .scaleLinear()
      .domain(d3.extent(y) as PairType)
      .range([0, canvas.height]);
    const data = d3.zip(x, y) as PairType[];

    line.x(d => scaleX(d[0]));
    line.y(d => scaleY(d[1]));
    drawGlowLine(ctx, line, data);

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
  };

  useEffect(init, []);

  return (
    <>
      <h1>hello world</h1>
      <p style={{ color: 'magenta' }}>
        Once upon a time, I saw a potato laying outside my door. I wondered what
        it was doing out there. Instead of asking i brought it inside mY room.
        It was shivering because of the cold. I felt extremely guilty leaving it
        outside, so my instinct was to imediately bring it inside. I brought
        inside and gave it a blanket I felt better imediately. Ahhhh, look at me
        im the superhero of this situation now everyone in town considers me a
        hero. When you walk past me remember to thank me for saving the life of
        a fellow potato. ('-')
      </p>
      <canvas ref={canvasRef} style={{ border: '1px solid blue' }} />
    </>
  );
}
