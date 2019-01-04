import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { setCanvasResolution } from 'utils/canvas';
import toPx from 'utils/units';
import { optimizedResize } from 'utils/throttleEvent';

interface GoodCanvasPropsType {
  style?: React.CSSProperties;
}

function _GoodCanvas(
  { style = {} }: GoodCanvasPropsType = {},
  forwardedRef: React.Ref<HTMLCanvasElement>
) {
  style = { width: '300px', height: '150px', ...style };
  const divRef = useRef<HTMLDivElement>(null);

  // run setCanvasResolution on initial mount
  useLayoutEffect(() => {
    const divElem = divRef.current!;
    const canvasElem = divElem.querySelector('canvas')!;
    let width = parseFloat(toPx(divElem, divElem.style.width));
    let height = parseFloat(toPx(divElem, divElem.style.height));
    setCanvasResolution(canvasElem, width, height);
  }, []);

  // run setCanvasResolution again on window resize
  useEffect(() => {
    const divElem = divRef.current!;
    const canvasElem = divElem.querySelector('canvas')!;

    const resizeHandler = () => {
      let width = parseFloat(toPx(divElem, divElem.style.width));
      let height = parseFloat(toPx(divElem, divElem.style.height));
      setCanvasResolution(canvasElem, width, height);
      console.warn('fired!', (canvasElem as any).info);
    };

    // throttle resize event
    window.addEventListener(optimizedResize, resizeHandler);

    // unbind event listener on unmoun
    return () => {
      window.removeEventListener(optimizedResize, resizeHandler);
    };
  }, []);

  // warn about styles that will be overridden
  if ('boxSizing' in style || 'padding' in style) {
    console.warn(
      'boxSizing and padding CSS properties will be overriden by GoodCanvas internally. Do not try to use these in the style prop.'
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
        // settings below override `style` given in props
        boxSizing: 'border-box',
        padding: 0,
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
