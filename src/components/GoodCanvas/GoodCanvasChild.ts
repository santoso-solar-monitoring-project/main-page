import React from 'react';
import { GoodCanvasElement } from './GoodCanvasElement';
import { injected } from 'utils/DefaultProps';

export const Props = injected<{
  canvasRef: React.RefObject<typeof GoodCanvasElement.propsOut>;
  canvasNeedsUpdate: number;
}>();
