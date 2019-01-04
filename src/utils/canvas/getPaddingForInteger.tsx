export default function getPaddingForInteger(
  dimension: number,
  scale: number,
  range = [0, 50, 1] /* [start,stop,step] */
) {
  let padding = NaN;
  const [start, stop, step] = range;
  for (let i = start; i < stop; i += step) {
    const result = (dimension + i) * scale;
    if (Math.trunc(result) == result) {
      padding = i;
      break;
    }
  }
  return padding;
}
