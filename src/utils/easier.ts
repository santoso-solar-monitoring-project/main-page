import React from 'react';

export type FC<P = {}> = React.FunctionComponent<P>;
export type RFC<T, P = {}> = React.RefForwardingComponent<T, P>;

export type REF<T> = React.MutableRefObject<T>;
export type CREF<T> = React.RefObject<T>;
