import React, { useEffect } from 'react';
import { getContext } from 'utils/canvas';
import * as d3 from 'd3';
import { GoodCanvasType } from 'components/GoodCanvas';

export type PairType = [number, number];

interface GlowLinePropTypes {
  data: PairType[];
  canvasStyles?: CanvasRenderingContext2D;
  line?: d3.Line<PairType>;
  // below are automatically added by GoodCanvas
  canvasRef?: React.RefObject<GoodCanvasType>;
  canvasNeedsUpdate?: number;
}

export default function GlowLine(props: GlowLinePropTypes) {
  // unpack required params
  const { canvasRef, canvasNeedsUpdate, data } = props;

  if (!canvasRef) return null;

  useEffect(
    () => {
      const { ctx } = getContext(canvasRef);

      // unpack optional params
      let { canvasStyles = {}, line = null } = props;

      // populate default context properties
      const defaultContextProps = {
        lineWidth: 1,
        shadowBlur: 10,
        strokeStyle: 'red',
        shadowColor: 'red',
      };
      canvasStyles = { ...defaultContextProps, canvasStyles };

      // populate default line properties
      if (!line) {
        const defaultLine = d3
          .line()
          .context(ctx)
          // alpha = 0.5 gives centripetal CatmullRom
          .curve(d3.curveCatmullRom.alpha(0.5));
        line = defaultLine;
      }

      // draw the line
      ctx.save();
      Object.assign(ctx, canvasStyles);
      ctx.beginPath();
      line(data);
      ctx.stroke();
      ctx.restore();

      // ctx.font = '48px Ubuntu Mono';
      ctx.font = `16px times new roman`;
      // ctx.font = `16px Ubuntu Mono`;
      const story = `Once upon a time, I saw a potato laying outside my door.`;
      ctx.fillText(story, 10, 50);

      ctx.save();
      ctx.strokeStyle = 'none';
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, Math.PI / 2);
      ctx.lineTo(100, 100);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
    [canvasNeedsUpdate, data]
  );

  return null;
}
