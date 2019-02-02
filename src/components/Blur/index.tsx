import React, { useState } from 'react';
import { optimizedResize } from 'utils/throttleEvent';
import { useThrottled } from 'utils/CustomHooks';
import { BaseProps } from 'utils/BaseProps';
import { declare } from 'utils/DefaultProps';

export const Props = declare(
  class {
    static defaults = {
      radius: 5,
      timeout: 250,
      enabled: true,
      style: { filter: '' } as typeof BaseProps.propsOut.style,
    };
  },
  BaseProps
);

export const OwnProps = declare(Props.own);

const Blur: React.RefForwardingComponent<
  HTMLDivElement,
  typeof Props.propsOut
> = (props, ref) => {
  // stateful variables
  const [blurry, setBlurry] = useState(false);

  // unpack props
  const { children, style, radius, timeout, enabled } = props;

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

export default React.forwardRef(Props.wrap(Blur));
