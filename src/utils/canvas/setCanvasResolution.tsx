import getPaddingForInteger from './getPaddingForInteger';

export default function setCanvasResolution(
  canvasElem: HTMLCanvasElement,
  visibleWidth: number,
  visibleHeight: number,
  MAX_PADDING = 80,
  PRECISION = 4
) {
  // record size of visible region of canvas in pixels
  const info = ((canvasElem as any).info = {
    width: visibleWidth,
    height: visibleHeight,
  });

  // first convert dimensions to integer
  visibleWidth = Math.ceil(visibleWidth);
  visibleHeight = Math.ceil(visibleHeight);

  // find the extra padding needed to prevent canvas resolution truncation
  // https://stackoverflow.com/a/54027313/3624264
  const dpr = window.devicePixelRatio;
  const tolerance = Math.pow(10, -PRECISION);

  let padWidth = getPaddingForInteger(
    visibleWidth,
    dpr,
    MAX_PADDING,
    tolerance
  );
  let padHeight = getPaddingForInteger(
    visibleHeight,
    dpr,
    MAX_PADDING,
    tolerance
  );

  // if can't find a value without truncation just warn and continue (and use no padding).
  if (isNaN(padWidth)) {
    console.warn(
      `Truncation occurred when scaling the canvas horizontal resolution: ${(
        visibleWidth * dpr
      ).toFixed(PRECISION)}px -> ${Math.trunc(visibleWidth * dpr)}px`
    );
    padWidth = 0;
  }
  if (isNaN(padHeight)) {
    console.warn(
      `Truncation occurred when scaling the canvas vertical resolution: ${(
        visibleHeight * dpr
      ).toFixed(PRECISION)}px -> ${Math.trunc(visibleHeight * dpr)}px`
    );
    padHeight = 0;
  }

  // record padding into info object
  Object.assign(info, { padWidth, padHeight, devicePixelRatio: dpr });

  // set canvas resolution
  canvasElem.width = Math.round((visibleWidth + padWidth) * dpr);
  canvasElem.height = Math.round((visibleHeight + padHeight) * dpr);

  // match layout dimensions
  canvasElem.style.width = `${visibleWidth + padWidth}px`;
  canvasElem.style.height = `${visibleHeight + padHeight}px`;

  // draw using CSS pixel coordinates
  const ctx = canvasElem.getContext('2d')!;
  ctx.scale(dpr, dpr);

  // only draw visible region
  // ctx.rect(0, 0, visibleWidth, visibleHeight);
  // ctx.clip();
}
