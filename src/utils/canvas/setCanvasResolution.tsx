import toPx from 'utils/units';
import getPaddingForInteger from '.';

export default function setCanvasResolution(divEl: HTMLDivElement) {
  const canvasEl = divEl.querySelector('canvas')!;
  let width = parseFloat(toPx(divEl, divEl.style.width));
  let height = parseFloat(toPx(divEl, divEl.style.height));

  // record size of visible region of canvas in pixels (i.e. size of divEl)
  (canvasEl as any).visibleDimensions = { width, height };

  // first convert dimensions to integer
  width = Math.ceil(width);
  height = Math.ceil(height);

  // find the extra padding needed to prevent canvas resolution truncation
  // https://stackoverflow.com/a/54027313/3624264
  const dpr = +window.devicePixelRatio.toFixed(3);
  let padWidth = getPaddingForInteger(width, dpr, [0, 50, 1]);
  let padHeight = getPaddingForInteger(height, dpr, [0, 50, 1]);

  // if can't find a value without truncation just warn and continue (and use no padding).
  if (isNaN(padWidth)) {
    console.warn(
      `Truncation occurred when scaling the canvas horizontal resolution: ${padWidth}px -> ${Math.trunc(
        padWidth
      )}px`
    );
    padWidth = 0;
  }
  if (isNaN(padHeight)) {
    console.warn(
      `Truncation occurred when scaling the canvas vertical resolution: ${padHeight}px -> ${Math.trunc(
        padHeight
      )}px`
    );
    padHeight = 0;
  }

  // set canvas resolution
  canvasEl.width = (width + padWidth) * dpr;
  canvasEl.height = (height + padHeight) * dpr;

  // match layout dimensions
  canvasEl.style.width = `${width + padWidth}px`;
  canvasEl.style.height = `${height + padHeight}px`;

  // draw using CSS pixel coordinates
  const ctx = canvasEl.getContext('2d')!;
  ctx.scale(dpr, dpr);

  // only draw visible region
  ctx.rect(0, 0, width, height);
  ctx.clip();
}
