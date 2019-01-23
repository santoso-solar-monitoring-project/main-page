import React, { useEffect, useCallback } from 'react';
import Denque from 'denque';
import { GoodCanvasElement } from 'components/GoodCanvas';
import * as A from '.';
import { getContext } from 'utils/canvas';
import { useDataBufferSilent } from 'utils/CustomHooks';

export function useAnimationLoop(
  canvasRef: React.RefObject<GoodCanvasElement>
): [Denque<A.LoopItemType>, A.SubscribeType] {
  // Animation loop array
  const [loop, concat] = useDataBufferSilent<A.LoopItemType>();

  // Function to append elements to loop
  const subscribe = useCallback<A.SubscribeType>(animate => {
    const node = { animate };
    concat([node]);
    return () => {
      delete node.animate;
    };
  }, []);

  // Start the loop
  useEffect(() => {
    const { canvas, ctx } = getContext(canvasRef);
    let id: number;
    let last = performance.now();
    const globalLoop = (now: number) => {
      const args = { canvas, ctx, delta: now - last };
      const dead: number[] = [];
      loop.forEach(({ animate }, i) => {
        if (animate) {
          ctx.save();
          animate(args);
          ctx.restore();
        } else {
          dead.push(i);
        }
      });
      // loop index j corresponds to number of elements removed already
      dead.forEach((x, j) => loop.removeOne(x - j));
      last = now;
      id = requestAnimationFrame(globalLoop);
    };
    globalLoop(0);
    return () => cancelAnimationFrame(id);
  }, []);

  return [loop, subscribe];
}
