import React, { useLayoutEffect } from 'react';
import { getContext } from '.';
export default function useCanvasResizeEffect(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  useLayoutEffect(() => {
    const resize = () => {
      const { canvas, ctx } = getContext(canvasRef);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = window.devicePixelRatio;
      canvas.width = ratio * width;
      canvas.height = ratio * height;
      ctx.scale(ratio, ratio);
    };
    document.addEventListener('resize', resize);
    resize();
    return document.removeEventListener('resize', resize);
  }, []);
}
