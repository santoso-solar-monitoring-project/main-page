import React, { useState } from 'react';
import { optimizedResize } from 'utils/throttleEvent';
import { useThrottled } from 'utils/CustomHooks';
import { BaseProps } from 'utils/BaseProps';
import { Omit } from 'utils/meta';
import { withImm } from 'utils/Imm';

export interface Props extends BaseProps {
  radius?: number;
  timeout?: number;
  enabled?: boolean;
}

export type OwnProps = Omit<Props, keyof BaseProps>;

export const defaultProps = {
  radius: 5,
  timeout: 250,
  enabled: true,
  style: { filter: '' } as Props['style'],
};

const Blur: React.RefForwardingComponent<HTMLDivElement, Props> = (
  props,
  ref
) => {
  // stateful variables
  const [blurry, setBlurry] = useState(false);

  // unpack props
  const { children } = props;
  const { style, radius, timeout, enabled } = withImm.merge(
    defaultProps,
    props
  );

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
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

export default React.forwardRef(Blur);
