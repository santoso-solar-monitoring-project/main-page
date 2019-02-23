import React, { SetStateAction } from 'react';
import { declare, defaults, injected } from 'utils/DefaultProps';

export const GoodCanvasElement = declare(
  defaults({
    dims: {
      width: 300,
      height: 150,
    },
    setNeedsUpdate: (() => {
      throw new Error('Forgot to attach setNeedsUpdate...');
    }) as React.Dispatch<SetStateAction<number>>,
  }),
  injected<HTMLCanvasElement>()
);
