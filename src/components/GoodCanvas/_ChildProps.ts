import React from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { EnhancedContext } from 'utils/canvas';
import { GoodCanvasElement } from '.';
import { BaseProps } from 'utils/BaseProps';
import noop from 'utils/noop';
import { Omit } from 'utils/meta';

// Props automatically added to children of GoodCanvas.
export interface PropsType extends BaseProps {
  // Reference to internal canvas.
  canvasRef?: React.RefObject<GoodCanvasElement>;
  // Settings to be applied to the CanvasRenderingContext2D.
  canvasStyle?: Partial<EnhancedContext>;
  // Callback to apply settings to the CanvasRenderingContext2D.
  canvasEffects?: (ctx: EnhancedContext) => void;
  // Global version number. Increments when all children should repaint.
  canvasNeedsUpdate?: number;
}

export type OwnPropsType = Omit<PropsType, keyof BaseProps>;

export type DefaultPropsType = Partial<PropsType>;
export type ImmDefaultPropsType = ImmMapType<DefaultPropsType>;

export const defaultProps: ImmDefaultPropsType = Imm.fromJS({
  canvasRef: null,
  canvasStyle: {},
  canvasEffects: noop,
  canvasNeedsUpdate: 0,
});
