import { newEffect } from './newEffect';

export const clear = newEffect(ctx => {
  const { width, height } = ctx;
  ctx.clearRect(0, 0, width, height);
});
