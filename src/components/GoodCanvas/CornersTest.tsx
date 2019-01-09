import React, { useEffect } from 'react';
import GoodCanvas, { GoodCanvasType } from '.';
import { PropTypes } from 'utils/PropTypes';
import { getContext } from 'utils/canvas';

export default function CornersTest({ style = {} }: PropTypes = {}) {
  return (
    <GoodCanvas style={style}>
      {/* Corners will get a reference to the canvas automatically. */}
      <Corners />
    </GoodCanvas>
  );
}

// Interface for a child of GoodCanvas
function Corners({
  canvasRef,
  canvasNeedsUpdate,
}: {
  canvasRef?: React.RefObject<GoodCanvasType>;
  canvasNeedsUpdate?: number;
}) {
  // console.log(canvasRef, canvasRef!.current);

  if (!canvasRef) return null;

  useEffect(
    () => {
      const { canvas, ctx } = getContext(canvasRef!);
      const dims = (canvas as GoodCanvasType).dims;
      // console.log(dims, ctx.filter);

      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(5, 5, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(dims.width - 5, 5, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(dims.width - 5, dims.height - 5, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'magenta';
      ctx.beginPath();
      ctx.arc(5, dims.height - 5, 5, 0, 2 * Math.PI);
      ctx.fill();
    },
    [canvasNeedsUpdate]
  );

  return null;
}
