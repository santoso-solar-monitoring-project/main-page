import { GoodCanvasElement } from './GoodCanvasElement';
export { GoodCanvasElement } from './GoodCanvasElement';

// Re-export ChildProps.*
import * as GoodCanvasChild from './GoodCanvasChild';
export { GoodCanvasChild };

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { scaleCanvas, getContext } from 'utils/canvas';
import { optimizedResize } from 'utils/throttleEvent';
import { useThrottled } from 'utils/CustomHooks';
import { propagateProps } from 'utils/propagateProps';
import ignore from 'utils/ignore';
import { BaseProps } from 'utils/BaseProps';
import Blur, * as BlurNS from 'components/Blur';
import noop from 'utils/noop';
import { useImm } from 'utils/Imm';
import isValidRefObject from 'utils/isValidRefObject';
import { declare } from 'utils/DefaultProps';

const Props = declare(
  class {
    static required: {
      blur?: typeof BlurNS.OwnProps.propsIn;
    };
    static defaults = {
      style: {
        position: 'relative',
        overflow: 'hidden',
        width: '300px',
        height: '150px',
        boxSizing: 'content-box',
      } as typeof BaseProps.propsOut.style,
      showWarnings: false,
      timeout: 250,
      notify: noop,
    };
  },
  BaseProps
);

/* 
  A properly scaled <canvas> element accounting for window.devicePixelRatio.

  Set the size and other layout properties of GoodCanvas directly through the CSS style prop.

  GoodCanvas attaches all props listed in the GoodCanvasChildPropsType to its child components:
    1. `canvasRef` -- ref to internal <canvas> element.
    2. `canvasNeedsUpdate` -- counter incremented when GoodCanvas is rescaled.

  These new props allow child components to have access to the canvas rendering context as well as to be informed when they should re-render, since rescaling the <canvas> clears all its pixels.
  
  To toggle warnings use the `showWarnings` boolean prop.
*/
const GoodCanvas: React.RefForwardingComponent<
  typeof GoodCanvasElement.propsOut,
  typeof Props.propsOut
> = (props, ref) => {
  // stateful variables
  const [needsUpdate, setNeedsUpdate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<typeof GoodCanvasElement.propsOut>(null);
  const firstRender = useRef(true);

  // Populate forwardedRef if not given (to be used internally).
  ref = ref || canvasRef;

  // Verify the ref passed is not a custom functional ref.
  if (!isValidRefObject(canvasRef)) {
    // Not reached
    throw Error();
  }

  // Populate default props.
  const { blur, children, style, showWarnings, timeout, notify } = props;

  // Toggle warnings.
  const warn = showWarnings ? console.warn : ignore;

  // Scale the canvas resolution.
  useImm(useLayoutEffect)(
    () => {
      const container = containerRef.current!;
      const { canvas, ctx } = getContext(ref);
      const computeStyle = (property: string) =>
        parseFloat(
          window.getComputedStyle(container).getPropertyValue(property)
        );
      let width = computeStyle('width');
      let height = computeStyle('height');

      // Subtract padding and border.
      if (container.style.boxSizing == 'border-box') {
        // Get padding and border offsets for one direction.
        const getTotalOffset = (direction: string) => {
          return (
            computeStyle(`border-${direction}-width`) +
            computeStyle(`padding-${direction}`)
          );
        };

        // Subtract horizontal offset.
        width -= getTotalOffset('left') + getTotalOffset('right');

        // Subtract vertical offset.
        height -= getTotalOffset('top') + getTotalOffset('bottom');
      }

      // Hard work happens here.
      const t = performance.now();
      scaleCanvas({ canvas, width, height, ctx });
      warn(
        `GoodCanvas rescale complete. (${(performance.now() - t).toFixed(
          2
        )} ms)`
      );

      // Notify parents
      if (!firstRender.current && notify) notify();
    },
    [needsUpdate, style]
  );

  // Attach setNeedsUpdate to canvas DOM element.
  useLayoutEffect(() => {
    const { canvas } = getContext(ref);
    canvas.setNeedsUpdate = setNeedsUpdate;
  }, []);

  // Attach event listener to re-render on window resize.
  useThrottled(
    {
      event: optimizedResize,
      first: () =>
        warn(
          'GoodCanvas is rescaling because the window resized. If this is happening often, there could be a negative performance impact.'
        ),
      last: () => setNeedsUpdate(i => i + 1),
      timeout: timeout,
    },
    [timeout]
  );

  // Warn about re-scale when styles change.
  useImm(useEffect)(
    () => {
      if (firstRender.current) {
        return;
      }
      warn(
        'GoodCanvas is rescaling because the `style` prop changed. If this is happening often, there could be a negative performance impact.'
      );
    },
    [style]
  );

  // Mark first render cycle complete.
  useEffect(() => {
    firstRender.current = false;
  }, []);

  // Warn on unmount to help detect undesired behavior.
  useEffect(() => {
    return () =>
      warn(
        'GoodCanvas is unmounting. If this is happening often, there could be a negative performance impact.'
      );
  }, []);

  warn('GoodCanvas RENDER');

  // Attach GoodCanvasChildPropsType props to children subtree.
  const decoratedChildren = useImm(useMemo)(
    () => {
      return propagateProps<typeof GoodCanvasChild.Props.propsIn>(
        children,
        child => {
          const { canvasStyle, canvasEffects } = GoodCanvasChild.Props(
            child.props
          );

          return {
            canvasRef: ref as React.RefObject<
              typeof GoodCanvasElement.propsOut
            >,
            canvasNeedsUpdate: needsUpdate,
            canvasStyle,
            canvasEffects,
          };
        }
      );
    },
    [needsUpdate, children, ref]
  );

  return (
    <div style={style} ref={containerRef}>
      <Blur style={{ width: '100%', height: '100%' }} {...blur}>
        <canvas
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            margin: 0,
            padding: 0,
            border: 'none',
          }}
          ref={ref}
        >
          {decoratedChildren}
        </canvas>
      </Blur>
    </div>
  );
};

export default React.forwardRef(Props.attach(GoodCanvas));
