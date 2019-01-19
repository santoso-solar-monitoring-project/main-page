import React, { useState } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { optimizedResize } from 'utils/throttleEvent';
import { ChildProps } from 'components/GoodCanvas';
import { useThrottled } from 'utils/CustomHooks';

export interface PropsType extends ChildProps.PropsType {
  radius: number;
  timeout: number;
  enabled: boolean;
}

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  radius: 5,
  timeout: 250,
  enabled: true,
  style: { filter: '' },
});

type _BlurType = React.RefForwardingComponent<HTMLDivElement, DefaultPropsType>;

const _Blur: _BlurType = (
  props: DefaultPropsType,
  forwardedRef: React.Ref<HTMLDivElement>
) => {
  // stateful variables
  const [blurry, setBlurry] = useState(false);

  // unpack props
  const {
    style,
    radius,
    timeout,
    enabled,
    ...rest
  }: DefaultPropsType = defaultProps.mergeDeep(props).toJS();
  const children = props.children;

  // attach handler to blur on window resize
  useThrottled(
    {
      event: optimizedResize,
      first: () => setBlurry(true),
      last: () => setBlurry(false),
      timeout,
    },
    [timeout]
  );

  // make it blurry
  if (enabled && blurry) {
    style!['filter'] += `blur(${radius}px)`;
  }

  return (
    <div ref={forwardedRef} style={style}>
      {children}
    </div>
  );
};

const Blur = React.forwardRef(_Blur);
Blur.displayName = 'Blur';
Blur.defaultProps = defaultProps.toJS();
export default Blur;
