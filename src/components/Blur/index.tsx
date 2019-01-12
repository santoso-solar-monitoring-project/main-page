import React, { useState, useEffect } from 'react';
import Imm from 'immutable';
import { PropsType } from 'utils/PropsType';
import { optimizedResize } from 'utils/throttleEvent';

export interface BlurPropsType extends PropsType {
  blur: { radius: number; timeout: number };
}

const defaultProps: Partial<BlurPropsType> = Imm.fromJS({
  radius: 5,
  timeout: 250,
  children: null,
  style: { filter: '' },
});

type _BlurType = React.RefForwardingComponent<
  HTMLDivElement,
  typeof defaultProps
>;

const _Blur: _BlurType = (
  props: typeof defaultProps
  // forwardedCanvasRef: React.Ref<HTMLDivElement>
) => {
  // stateful variables
  const [blurry, setBlurry] = useState(false);

  // unpack props
  const { children, style, radius, timeout, ...rest } = defaultProps
    .mergeDeep(props)
    .toJS();

  // console.warn('_Blur', (forwardedCanvasRef as any).current);

  if (blurry) {
    style['filter'] += `blur(${radius}px)`;
  }

  // attach handler to blur on window resize
  useEffect(() => {
    let ongoing = false;
    let timeoutId: number;

    const handler = () => {
      // first resize event
      if (!ongoing) {
        ongoing = true;
        setBlurry(true);
      }

      // dismiss pending events
      if (timeoutId) clearTimeout(timeoutId);

      // fulfill last response after timeout
      timeoutId = window.setTimeout(() => {
        ongoing = false;
        setBlurry(false);
      }, timeout);
    };

    window.addEventListener(optimizedResize, handler);
    return () => window.removeEventListener(optimizedResize, handler);
  }, []);

  return (
    <div
      // ref={forwardedCanvasRef}
      style={style}
      {...rest}
    >
      {React.Children.map(children, child => {
        console.log(child);
        const a = React.cloneElement(child);
        console.warn(a);
        return a;
      })
      // React.cloneElement(children)
      }
    </div>
  );
};

// const Blur = React.forwardRef(_Blur);
// Blur.displayName = 'Blur';
// Blur.defaultProps = defaultProps.toJS();
// export default Blur;
export default _Blur;
