import React, { useLayoutEffect, useRef, useEffect } from 'react';
import setCanvasResolution from 'utils/canvas';

interface GoodCanvasPropsType {
  style?: React.CSSProperties;
}

function _GoodCanvas(
  { style = {} }: GoodCanvasPropsType = {},
  forwardedRef: React.Ref<HTMLCanvasElement>
) {
  style = { width: '300px', height: '150px', ...style };
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const divEl = divRef.current;
    setCanvasResolution(divEl);
  }, []);

  // run setCanvasResolution again on window resize
  useEffect(() => {
    document.addEventListener('resize', setCanvasResolution);
    const unbind = () =>
      document.removeEventListener('resize', setCanvasResolution);
    return unbind;
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      ref={divRef}
    >
      <canvas
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        ref={forwardedRef}
      />
    </div>
  );
}

const GoodCanvas = React.forwardRef(_GoodCanvas);
GoodCanvas.displayName = 'GoodCanvas';
export default GoodCanvas;
