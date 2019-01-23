import React from 'react';
import { BaseProps } from './BaseProps';

export function propagateProps<P = BaseProps>(
  children: React.ReactNode,
  props: (
    child: React.ReactElement<P & { children?: React.ReactNode }>
  ) => P | Partial<P>
) {
  if (!children) return null;
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement<P & { children?: React.ReactNode }>(child)) {
          // recurse down
          propagateProps(child.props.children, props);
          // attach to current node and return
          if (typeof props == 'function') {
            return React.cloneElement<P>(child, props(child));
          } else {
            return React.cloneElement<P>(child, props);
          }
        } else {
          return child;
        }
      })}
    </>
  );
}
