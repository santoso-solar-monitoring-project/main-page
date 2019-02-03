import { useCounter } from 'utils/CustomHooks';
import { useEffect } from 'react';

export function useAnimationFrame() {
  const [, nextFrame] = useCounter();
  useEffect(() => {
    const loop = () => {
      nextFrame();
      id = requestAnimationFrame(loop);
    };
    let id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);

    // let n = 0;
    // let id = window.setInterval(loop, 1000);
    // return () => window.clearInterval(id);
  }, []);
}
