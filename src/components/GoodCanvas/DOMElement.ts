import React, { SetStateAction } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';

// The augmented HTML <canvas> element.
export interface AttributesType extends HTMLCanvasElement {
  dims: {
    width: number;
    height: number;
  };
  // For anyone to request global repaint
  setNeedsUpdate: React.Dispatch<SetStateAction<number>>;
}

export type DefaultAttributesType = Partial<AttributesType>;
export type ImmDefaultAttributesType = ImmMapType<DefaultAttributesType>;

export const defaultAttributes: ImmDefaultAttributesType = Imm.fromJS({
  dims: {
    width: 300,
    height: 150,
  },
  setNeedsUpdate: () => {
    throw new Error('Forgot to attach setNeedsUpdate...');
  },
});
