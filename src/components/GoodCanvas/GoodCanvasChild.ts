import React from 'react';
import { EnhancedContext } from 'utils/canvas';
import { GoodCanvasElement } from '.';
import { BaseProps } from 'utils/BaseProps';
import noop from 'utils/noop';
import { Omit } from 'utils/meta';

// Props automatically added to children of GoodCanvas.
export interface Props extends BaseProps {
  // Reference to internal canvas.
  canvasRef?: React.RefObject<GoodCanvasElement>;
  // Settings to be applied to the CanvasRenderingContext2D.
  canvasStyle?: Partial<EnhancedContext>;
  // Callback to apply settings to the CanvasRenderingContext2D.
  canvasEffects?: (ctx: EnhancedContext) => void;
  // Global version number. Increments when all children should repaint.
  canvasNeedsUpdate?: number;
}

export type OwnProps = Omit<Props, keyof BaseProps>;

export const defaultProps = {
  canvasStyle: {},
  canvasEffects: noop,
  canvasNeedsUpdate: 0,
};
