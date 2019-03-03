import React, { useEffect } from 'react';
import { optimizedResize } from 'utils/throttleEvent';
import { useThrottled } from 'utils/CustomHooks';
import { BaseProps } from 'utils/BaseProps';
import { declare, defaults } from 'utils/DefaultProps';
import { REF } from 'utils/easier';
import { animated, useSpring } from 'react-spring';

export const Props = declare(
  defaults({
    radius: 5,
    timeout: 250,
    enabled: true,
    style: { filter: '' } as typeof BaseProps.propsOut.style,
  }),
  BaseProps
);

export const OwnProps = declare(Props.own);

const Blur = Props.wrap(
  ({ children, style, radius, timeout, enabled }, ref: REF<HTMLDivElement>) => {
    const [{ filter }, update] = useSpring(() => ({
      filter: `${style.filter} blur(0px)`,
      from: {
        filter: `${style.filter} blur(${radius}px)`,
      },
      config: { duration: 250 },
    }));

    // attach handler to blur on window resize
    useThrottled(
      {
        event: optimizedResize,
        first: () =>
          update({
            filter: `${style.filter} blur(${enabled ? radius : 0}px)`,
          }),
        last: () =>
          update({
            filter: `${style.filter} blur(0px)`,
          }),
        timeout,
      },
      [timeout]
    );

    // attach handler to blur on visibility change
    useEffect(() => {
      const handler = () => {
        update({
          filter: `${style.filter} blur(${
            enabled && document.hidden ? radius : 0
          }px)`,
        });
      };
      document.addEventListener('visibilitychange', handler);
      return () => document.removeEventListener('visibilitychange', handler);
    }, [style.filter, enabled, radius]);

    return (
      <animated.div
        ref={ref}
        style={{
          ...style,
          filter,
        }}
      >
        {children}
      </animated.div>
    );
  }
);

export default React.forwardRef(Blur);
