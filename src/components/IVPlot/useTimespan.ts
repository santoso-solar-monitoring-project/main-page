import { GoodCanvasChild } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { useEffect, useRef } from 'react';
import { declare, required } from 'utils/DefaultProps';

const Args = declare(
  required({} as {
    speed: number; // translate by pixels / second
  }),
  required(GoodCanvasChild.propsOut)
);

// update timespan and stride (based on canvas width and zoom)
export const useTimespan = Args.wrap(
  ({ canvasRef, canvasNeedsUpdate, speed }) => {
    const timespan = useRef(0);
    useEffect(() => {
      const { canvas } = getContext(canvasRef);
      timespan.current = canvas.dims.width / (speed / 1000);
    }, [canvasNeedsUpdate]);

    return timespan.current; // ms
  }
);
