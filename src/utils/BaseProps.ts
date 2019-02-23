import React from 'react';
import { declare, required, defaults } from './DefaultProps';

export const StyleProp = defaults({
  style: {} as Partial<React.CSSProperties>,
});

// https://github.com/sw-yx/react-typescript-cheatsheet#useful-react-prop-type-examples
export const BaseProps = declare(
  required<{
    /* 1/9/19: SIGH. TypeScript can't check `children` because `React.createElement` returns back a super general `Element` type. */
    children?: React.ReactNode;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  }>(),
  StyleProp
);
