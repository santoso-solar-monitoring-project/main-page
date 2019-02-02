const clamp = (x: number, { lo = -Infinity, hi = Infinity } = {}) =>
  Math.min(hi, Math.max(lo, x));
export default clamp;
