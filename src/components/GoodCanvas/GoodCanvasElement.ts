import React, { SetStateAction } from 'react';
import { declare } from 'utils/DefaultProps';

export const GoodCanvasElement = declare(
  class {
    static defaults = Object.assign({} as HTMLCanvasElement, {
      dims: {
        width: 300,
        height: 150,
      },
      setNeedsUpdate: (() => {
        throw new Error('Forgot to attach setNeedsUpdate...');
      }) as React.Dispatch<SetStateAction<number>>,
    });
  }
);
