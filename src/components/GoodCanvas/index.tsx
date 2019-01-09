import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { scaleCanvas, getContext } from 'utils/canvas';
import toPx from 'utils/units';
import { optimizedResize } from 'utils/throttleEvent';
import { PropTypes } from 'utils/PropTypes';

// The augmented HTML <canvas> element.
export interface GoodCanvasType extends HTMLCanvasElement {
  needsUpdate: number;
  dims: {
    width: number;
    height: number;
  };
}

/* 
  A properly scaled <canvas> element accounting for window.devicePixelRatio.

  Set the size and other layout properties of GoodCanvas directly through the CSS style prop.

  By default, GoodCanvas will blur its contents while the screen resizes. Control this blur behavior with `blur` prop:
    blur: {radius: number, timeout: number}
  where radius is in pixels and timeout is in milliseconds. Passing `false` will disable blur behavior.
  // FUTURE: Perhaps extract this blur behavior to reuse elsewhere as well.

  GoodCanvas attaches two new props to its child components:
    1. `canvasRef` -- ref to internal <canvas> element.
    2. `canvasNeedsUpdate` -- counter incremented when GoodCanvas is rescaled.

  These new props allow child components to have access to the canvas rendering context as well as to be informed when they should re-render, since rescaling the <canvas> clears all its pixels.
  
  To toggle warnings use the `showWarnings` boolean prop.
*/
function _GoodCanvas(
  {
    style = {},
    children,
    blur = { radius: 5, timeout: 250 },
    showWarnings = true,
    ...otherProps
  }: PropTypes = {},
  forwardedCanvasRef: React.Ref<GoodCanvasType>
) {
  const [needsUpdate, setNeedsUpdate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<GoodCanvasType>(null);
  // Note: `<... | null>` is to use the overload returning a MutableRefObject
  const savedStyle = useRef<React.CSSProperties | null>(null);
  const [blurPx, setBlurPx] = useState(0);

  // populate forwardedCanvasRef if not given
  if (!forwardedCanvasRef) forwardedCanvasRef = canvasRef;

  // toggle warnings
  const warn = showWarnings ? console.warn : () => {};

  // warn about styles that will be overridden
  if ('padding' in style) {
    warn(
      'The padding CSS property will be overriden by GoodCanvas internally. Do not try to apply this property.'
    );
  }

  // populate default styles. override necessary styles.
  style = {
    position: 'relative',
    overflow: 'hidden',
    // default layout dimensions of canvas
    width: '300px',
    height: '150px',
    ...style,
    // settings below will override `style` given in props
    padding: 0,
  };

  // blur while resizing (if option enabled)
  if (blur && blurPx) {
    style.filter = [style.filter || '', `blur(${blurPx}px)`].join(' ');
  }

  // trigger re-scale when styles change
  if (!savedStyle.current) {
    savedStyle.current = style;
  } else if (
    Object.keys(style).some(rule => {
      if (rule != 'filter') {
        return (
          !(rule in savedStyle.current!) ||
          (style as any)[rule] != (savedStyle.current as any)[rule]
        );
      }
      return false;
    })
  ) {
    warn('GoodCanvas: The `style` prop changed triggering a rescaling.');
    savedStyle.current = style;
    setNeedsUpdate(i => i + 1);
  }

  // scale the canvas resolution
  useLayoutEffect(
    () => {
      const container = containerRef.current!;
      const { canvas } = getContext(forwardedCanvasRef);
      let width = parseFloat(toPx(container, container.style.width));
      let height = parseFloat(toPx(container, container.style.height));

      // account for box-sizing: border-box
      if (
        container.style.boxSizing &&
        container.style.boxSizing != 'content-box'
      ) {
        const borderLeft = parseFloat(
          toPx(container, container.style.borderLeftWidth)
        );
        const borderRight = parseFloat(
          toPx(container, container.style.borderRightWidth)
        );
        width -= borderLeft + borderRight;
        const borderTop = parseFloat(
          toPx(container, container.style.borderTopWidth)
        );
        const borderBottom = parseFloat(
          toPx(container, container.style.borderBottomWidth)
        );
        height -= borderTop + borderBottom;
      }

      scaleCanvas(canvas, width, height);

      // trigger re-render of children
      canvas.needsUpdate = needsUpdate;
      children;
    },
    [needsUpdate]
  );

  // warn on unmount to help detect undesired behavior
  useEffect(() => {
    return () =>
      warn(
        'GoodCanvas is unmounting. If this happens often, there could be an negative performance impact.'
      );
  }, []);

  // re-render on window resize
  useEffect(() => {
    let ongoing = false;
    let id: number;
    const { canvas } = getContext(forwardedCanvasRef);
    const triggerUpdate = () => {
      if (!ongoing) {
        warn('GoodCanvas: Window resized triggering a rescaling.');
        ongoing = true;
        setBlurPx(blur.radius);
      }

      if (id) clearTimeout(id);
      id = window.setTimeout(() => {
        ongoing = false;
        setBlurPx(0);
        setNeedsUpdate(i => i + 1);
      }, blur.timeout);
    };
    window.addEventListener(optimizedResize, triggerUpdate);
    return () => window.removeEventListener(optimizedResize, triggerUpdate);
  }, []);

  return (
    <div style={style} ref={containerRef} {...otherProps}>
      <canvas
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          border: 'none',
        }}
        ref={forwardedCanvasRef}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement<any>(child, {
              canvasRef: forwardedCanvasRef,
              canvasNeedsUpdate: needsUpdate,
            });
          } else {
            return child;
          }
        })}
      </canvas>
    </div>
  );
}

const GoodCanvas = React.forwardRef(_GoodCanvas);
GoodCanvas.displayName = 'GoodCanvas';
export default GoodCanvas;
