import { withImm } from './Imm';

const clamp = (x: number, range: [number?, number?]) => {
  const [lo, hi] = withImm.mergeIntersect([-Infinity, Infinity], range);
  return Math.min(hi, Math.max(lo, x));
};

export default clamp;
