import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  SetStateAction,
} from 'react';
import Imm from 'immutable';
import inPixels from 'utils/units';
import { EnhancedContext } from 'utils/canvas/enhanceContext';
import { scaleCanvas, getContext } from 'utils/canvas';
import { PropsType } from 'utils/PropsType';
import { optimizedResize } from 'utils/throttleEvent';
import propagateProps from 'utils/propagateProps';
import Blur from 'components/Blur';

// The augmented HTML <canvas> element.
export interface GoodCanvasType extends HTMLCanvasElement {
  dims: {
    width: number;
    height: number;
  };
  setNeedsUpdate: React.Dispatch<SetStateAction<number>>;
}

// Props automatically added to children of GoodCanvas.
export interface GoodCanvasChildPropsType extends PropsType {
  // Reference to internal canvas.
  canvasRef: React.Ref<GoodCanvasType>;
  // Settings to be applied to the CanvasRenderingContext2D.
  canvasStyle: Partial<EnhancedContext>;
  // Callback to apply settings to the CanvasRenderingContext2D.
  canvasEffects: (ctx: EnhancedContext) => void;
  // Global version number. Increments when all children should repaint.
  canvasNeedsUpdate: number;
}

export interface GoodCanvasPropsType extends PropsType {
  showWarnings: boolean;
  resizeTimeout: number;
}

const defaultProps: Partial<GoodCanvasPropsType> = Imm.fromJS({
  style: {
    // Critical. (TODO: warn user?)
    position: 'relative',
    overflow: 'hidden',
    // Optional.
    width: '300px',
    height: '150px',
  },
  showWarnings: true,
  resizeTimeout: 250,
});

type _GoodCanvasType = React.RefForwardingComponent<
  GoodCanvasType,
  typeof defaultProps
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
let theRef: any = React.createRef();
const _GoodCanvas: _GoodCanvasType = (
  props: typeof defaultProps,
  forwardedCanvasRef: React.Ref<GoodCanvasType>
) => {
  // stateful variables
  const [needsUpdate, setNeedsUpdate] = useState(0);
  // const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<GoodCanvasType>(null);
  type SavedStyleType = Imm.Map<keyof React.CSSProperties, string>;
  // `<... | null>` selects the overload returning a MutableRefObject.
  const savedStyle = useRef<SavedStyleType | null>(null);

  // Populate forwardedCanvasRef if not given (to be used internally).
  // if (cached == null) cached = canvasRef;
  // else if (cached != canvasRef) console.error('scream and shout !!@#%@#^@^');
  forwardedCanvasRef = forwardedCanvasRef || canvasRef;
  if (forwardedCanvasRef == null) console.error('wtf');

  // Populate default props.
  const merged = defaultProps.mergeDeep(props);
  const {
    style,
    showWarnings,
    resizeTimeout,
    children,
    ...rest
  } = merged.toJS();

  // Toggle warnings.
  const warn = showWarnings ? console.warn : () => {};

  // Trigger re-scale when styles change.
  if (savedStyle.current == null) {
    // Save style on first render.
    savedStyle.current = merged.get('style');
  } else if (savedStyle.current == merged.get('style')) {
    warn(
      'GoodCanvas is rescaling because the `style` prop changed. If this is happening often, there could be a negative performance impact.'
    );
    savedStyle.current = style;
    setNeedsUpdate(i => i + 1);
  }

  console.log(
    'GoodCanvas RENDER',
    forwardedCanvasRef ? (forwardedCanvasRef as any).current : 'bleh1',
    canvasRef ? (canvasRef as any)['current'] : 'bleh2',
    theRef ? (theRef as any)['current'] : 'bleh3',
    theRef
  );
  useEffect(() =>
    console.log(
      'GoodCanvas USEEFFECT',
      forwardedCanvasRef ? (forwardedCanvasRef as any).current : 'bleh1',
      canvasRef ? (canvasRef as any)['current'] : 'bleh2',
      theRef ? (theRef as any)['current'] : 'bleh3'
    )
  );

  // Attach setNeedsUpdate to canvas.
  useLayoutEffect(
    () => {
      console.log(
        'GoodCanvas USELAYOUTEFFECT',
        forwardedCanvasRef ? (forwardedCanvasRef as any).current : 'bleh1',
        canvasRef ? (canvasRef as any)['current'] : 'bleh2',
        theRef ? (theRef as any)['current'] : 'bleh3'
        // (containerRef as any).current
      );
      // const { canvas } = getContext(forwardedCanvasRef);
      // canvas.setNeedsUpdate = setNeedsUpdate;
    }
    // [setNeedsUpdate]
    // [theRef.current]
  );

  // Scale the canvas resolution.
  // useLayoutEffect(
  //   () => {
  //     const container = containerRef.current!;
  //     const { canvas } = getContext(forwardedCanvasRef);
  //     let width = inPixels(container, container.style.width);
  //     let height = inPixels(container, container.style.height);

  //     // Subtract padding and border.
  //     if (container.style.boxSizing == 'border-box') {
  //       // Get padding and border offsets for one direction.
  //       const getTotalOffset = (container: HTMLElement, direction: string) => {
  //         return ['border', 'padding'].reduce((subtotal, name) => {
  //           const value = (container.style as any)[`${name}${direction}Width`];
  //           return subtotal + inPixels(container, value);
  //         }, 0);
  //       };

  //       // Subtract horizontal offset.
  //       width -= ['Left', 'Right'].reduce(
  //         (subtotal, direction) =>
  //           subtotal + getTotalOffset(container, direction),
  //         0
  //       );

  //       // Subtract vertical offset.
  //       height -= ['Top', 'Bottom'].reduce(
  //         (subtotal, direction) =>
  //           subtotal + getTotalOffset(container, direction),
  //         0
  //       );
  //     }

  //     // Hard work happens here.
  //     const t = performance.now();
  //     scaleCanvas(canvas, width, height);
  //     warn(
  //       `GoodCanvas rescale complete. (${(performance.now() - t).toFixed(
  //         2
  //       )} ms)`
  //     );
  //   },
  //   [needsUpdate]
  // );

  // // Attach event listener to re-render on window resize.
  // useEffect(() => {
  //   let ongoing = false;
  //   let id: number;

  //   const handler = () => {
  //     // first resize event
  //     if (!ongoing) {
  //       warn(
  //         'GoodCanvas is rescaling because the window resized. If this is happening often, there could be a negative performance impact.'
  //       );
  //       ongoing = true;
  //     }

  //     // dismiss pending events
  //     if (id) clearTimeout(id);

  //     // fulfill last response after timeout
  //     id = window.setTimeout(() => {
  //       ongoing = false;
  //       console.warn('what');
  //       setNeedsUpdate(i => i + 1);
  //     }, resizeTimeout);
  //   };

  //   window.addEventListener(optimizedResize, handler);
  //   return () => window.removeEventListener(optimizedResize, handler);
  // }, []);

  // Warn on unmount to help detect undesired behavior.
  useEffect(() => {
    return () =>
      warn(
        'GoodCanvas is unmounting. If this is happening often, there could be a negative performance impact.'
      );
  }, []);

  return (
    <Blur
      style={style}
      // ref={containerRef}
      {...rest}
    >
      <canvas
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          border: 'none',
        }}
        ref={theRef}
        // ref={forwardedCanvasRef}
        // ref={x => console.log('when??', x)}
      >
        {// Attach GoodCanvasChildPropsType props to children subtree.
        propagateProps<GoodCanvasChildPropsType>(children, child => {
          const {
            props: { canvasStyle = {}, canvasEffects = () => {} } = {},
          } = child;
          return {
            canvasRef: forwardedCanvasRef,
            canvasNeedsUpdate: needsUpdate,
            canvasStyle,
            canvasEffects,
          };
        })}
      </canvas>
    </Blur>
  );
};

// const GoodCanvas = React.forwardRef(_GoodCanvas);
// GoodCanvas.displayName = 'GoodCanvas';
// GoodCanvas.defaultProps = defaultProps.toJS();
export default _GoodCanvas;
