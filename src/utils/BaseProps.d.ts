import React from 'react';

// https://github.com/sw-yx/react-typescript-cheatsheet#useful-react-prop-type-examples
export interface BaseProps {
  /* 
  children1: JSX.Element;                            // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[];            // meh, doesnt accept functions
  children3: React.ReactChild | React.ReactChildren; // better, but doesnt accept strings
*/
  children?: React.ReactNode; // best, accepts everything
  /* 1/9/19: SIGH. TypeScript can't check `children` because `React.createElement` returns back a super general `Element` type. */
  style?: Partial<React.CSSProperties>; // to pass through style props
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void; // form events!
  // props?: React.HTMLProps<P>; // to impersonate all the props of a HTML element
  /* I am uncertain about this line below... Too much latitude? */
  // [otherProp: string]: any;
}
