import { newEffect } from './newEffect';

export const clear = newEffect(ctx => {
  const { width, height } = ctx.canvas.dims;
  ctx.clearRect(0, 0, width, height);
});
