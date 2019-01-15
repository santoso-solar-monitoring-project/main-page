import React from 'react';
import { BasePropsType } from './BaseProps';

export interface ArgsType<P = BasePropsType> {
  children: React.ReactNode;
  props: (
    child: React.ReactElement<P & { children?: React.ReactNode }>
  ) => P | Partial<P>;
}

export default function propagateProps<P = BasePropsType>(
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
