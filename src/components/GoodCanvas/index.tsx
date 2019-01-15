// Re-export GoodCanvasElement.*
import * as GoodCanvasElementNS from './DOMElement';
export type GoodCanvasElement = GoodCanvasElementNS.AttributesType;
export { GoodCanvasElementNS };

// Re-export ChildProps.*
import * as ChildPropsNS from './ChildProps';
export { ChildPropsNS as ChildProps };

import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { scaleCanvas, getContext } from 'utils/canvas';
import { optimizedResize } from 'utils/throttleEvent';
import useThrottled from 'utils/useThrottled';
import useImmLayoutEffect from 'utils/useImmLayoutEffect';
import useImmEffect from 'utils/useImmEffect';
import propagateProps from 'utils/propagateProps';
import ignore from 'utils/ignore';
import { BasePropsType } from 'utils/BaseProps';
import Blur, * as BlurNS from 'components/Blur';
import noop from 'utils/noop';

export interface PropsType extends BasePropsType {
  showWarnings: boolean;
  timeout: number;
  blur: Omit<BlurNS.DefaultPropsType, keyof BasePropsType>;
  notify: () => void;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  style: {
    position: 'relative',
    overflow: 'hidden',
    width: '300px',
    height: '150px',
    boxSizing: 'content-box',
  },
  showWarnings: false,
  timeout: 250,
  notify: noop,
});

type _GoodCanvasType = React.RefForwardingComponent<
  GoodCanvasElement,
  DefaultPropsType
>;

/* 
  A properly scaled <canvas> element accounting for window.devicePixelRatio.

  Set the size and other layout properties of GoodCanvas directly through the CSS style prop.

  GoodCanvas attaches all props listed in the GoodCanvasChildPropsType to its child components:
    1. `canvasRef` -- ref to internal <canvas> element.
    2. `canvasNeedsUpdate` -- counter incremented when GoodCanvas is rescaled.

  These new props allow child components to have access to the canvas rendering context as well as to be informed when they should re-render, since rescaling the <canvas> clears all its pixels.
  
  To toggle warnings use the `showWarnings` boolean prop.
*/
const _GoodCanvas: _GoodCanvasType = (
  props: DefaultPropsType,
  forwardedRef: React.Ref<GoodCanvasElement>
) => {
  // stateful variables
  const [needsUpdate, setNeedsUpdate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<GoodCanvasElement>(null);
  const firstRender = useRef(true);

  // Populate forwardedRef if not given (to be used internally).
  forwardedRef = forwardedRef || canvasRef;

  // Populate default props.
  const mergedProps = defaultProps.mergeDeep(props);
  const {
    style,
    showWarnings,
    timeout,
    blur,
    notify,
  }: DefaultPropsType = mergedProps.toJS();
  const children = props.children;

  // Toggle warnings.
  const warn = showWarnings ? console.warn : ignore;

  // Scale the canvas resolution.
  useImmLayoutEffect(
    () => {
      const container = containerRef.current!;
      const { canvas, ctx } = getContext(forwardedRef);
      const computeStyle = (property: string) =>
        parseFloat(
          window.getComputedStyle(container).getPropertyValue(property)
        );
      let width = computeStyle('width');
      let height = computeStyle('height');

      // Subtract padding and border.
      if (container.style.boxSizing == 'border-box') {
        // Get padding and border offsets for one direction.
        const getTotalOffset = (container: HTMLElement, direction: string) => {
          return (
            computeStyle(`border-${direction}-width`) +
            computeStyle(`padding-${direction}`)
          );
        };

        // Subtract horizontal offset.
        width -=
          getTotalOffset(container, 'left') +
          getTotalOffset(container, 'right');

        // Subtract vertical offset.
        height -=
          getTotalOffset(container, 'top') +
          getTotalOffset(container, 'bottom');
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
    [needsUpdate, mergedProps.get('style')]
  );

  // Attach setNeedsUpdate to canvas DOM element.
  useLayoutEffect(() => {
    const { canvas } = getContext(forwardedRef);
    canvas.setNeedsUpdate = setNeedsUpdate;
  }, []);

  // Attach event listener to re-render on window resize.
  useThrottled(
    {
      event: optimizedResize,
      before: () =>
        warn(
          'GoodCanvas is rescaling because the window resized. If this is happening often, there could be a negative performance impact.'
        ),
      after: () => setNeedsUpdate(i => i + 1),
      timeout: timeout,
    },
    [timeout]
  );

  // Warn about re-scale when styles change.
  useImmEffect(
    () => {
      if (firstRender.current) {
        return;
      }
      warn(
        'GoodCanvas is rescaling because the `style` prop changed. If this is happening often, there could be a negative performance impact.'
      );
    },
    [mergedProps.get('style')]
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
  warn('CANVAS RENDER');
  return (
    <Blur style={style} ref={containerRef} {...blur}>
      <canvas
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          border: 'none',
        }}
        ref={forwardedRef}
      >
        {// Attach GoodCanvasChildPropsType props to children subtree.
        propagateProps<ChildPropsNS.PropsType>(children, child => {
          const {
            canvasStyle,
            canvasEffects,
          }: ChildPropsNS.DefaultPropsType = ChildPropsNS.defaultProps
            .mergeDeep(child.props)
            .toJS();

          return {
            canvasRef: forwardedRef,
            canvasNeedsUpdate: needsUpdate,
            canvasStyle,
            canvasEffects,
          };
        })}
      </canvas>
    </Blur>
  );
};

const GoodCanvas = React.forwardRef(_GoodCanvas);
GoodCanvas.displayName = 'GoodCanvas';
GoodCanvas.defaultProps = defaultProps.toJS();
export default GoodCanvas;
