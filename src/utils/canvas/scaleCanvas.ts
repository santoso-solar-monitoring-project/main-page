import { GoodCanvasElement } from 'components/GoodCanvas';
import { EnhancedContext } from '.';

export interface ArgsType {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  ctx?: EnhancedContext;
}

type ScaleCanvasType = (args: ArgsType) => void;

/*
https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas/54027313#54027313
*/
const scaleCanvas: ScaleCanvasType = (args: ArgsType) => {
  // Unpack arguments.
  const { canvas, ctx: enhanced } = args;
  let { width, height } = args;

  // Get pixel ratio.
  const dpr = window.devicePixelRatio;

  // Size the canvas a bit bigger than desired.
  const [savedWidth, savedHeight] = [width, height];
  width = Math.ceil(width * dpr);
  height = Math.ceil(height * dpr);

  // Set the canvas resolution dimensions (integer values).
  canvas.width = width;
  canvas.height = height;

  // Set the canvas layout dimensions with respect to the canvas
  // resolution dimensions. (Not necessarily integer values!)
  canvas.style.width = `${width / dpr}px`;
  canvas.style.height = `${height / dpr}px`;

  // Adjust canvas coordinates to use CSS pixel coordinates.
  const ctx = enhanced || canvas.getContext('2d')!;
  ctx.resetTransform();
  ctx.scale(dpr, dpr);

  // Only draw visible region.
  ctx.rect(0, 0, savedWidth, savedHeight);
  ctx.clip();

  // Save bounding dimensions in Canvas coordinates.
  (canvas as GoodCanvasElement).dims = {
    width: savedWidth,
    height: savedHeight,
  };
};

export default scaleCanvas;
