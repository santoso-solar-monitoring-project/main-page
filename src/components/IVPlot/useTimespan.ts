import { GoodCanvasChild } from 'components/GoodCanvas';
import { getContext } from 'utils/canvas';
import { useEffect, useState } from 'react';
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
    const [timespan, update] = useState(0);
    useEffect(() => {
      const { canvas } = getContext(canvasRef);
      update(canvas.dims.width / (speed / 1000));
    }, [canvasNeedsUpdate]);

    return timespan; // ms
  }
);
