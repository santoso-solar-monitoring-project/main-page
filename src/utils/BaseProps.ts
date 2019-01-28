import React from 'react';
import { declare } from './DefaultProps';

// https://github.com/sw-yx/react-typescript-cheatsheet#useful-react-prop-type-examples
export const BaseProps = declare(
  class {
    static required: {
      /* 1/9/19: SIGH. TypeScript can't check `children` because `React.createElement` returns back a super general `Element` type. */
      children?: React.ReactNode;
      onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    };
    static defaults = { style: {} as Partial<React.CSSProperties> };
  }
);
