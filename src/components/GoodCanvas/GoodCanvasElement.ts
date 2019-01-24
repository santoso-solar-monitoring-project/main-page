import React, { SetStateAction } from 'react';

// The augmented HTML <canvas> element.
export interface GoodCanvasElement extends HTMLCanvasElement {
  dims: {
    width: number;
    height: number;
  };
  // For anyone to request global repaint
  setNeedsUpdate: React.Dispatch<SetStateAction<number>>;
}

export const defaultAttributes = {
  dims: {
    width: 300,
    height: 150,
  },
  setNeedsUpdate: () => {
    throw new Error('Forgot to attach setNeedsUpdate...');
  },
};
