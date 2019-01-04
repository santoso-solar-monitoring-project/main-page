export default function getPaddingForInteger(
  dimension: number,
  scale: number,
  max_padding: number,
  tolerance: number
) {
  let padding = NaN;
  for (let i = 0; i <= max_padding; i++) {
    const result = (dimension + i) * scale;
    const fractionalError = Math.abs(Math.round(result) - result) / result;
    if (fractionalError < tolerance) {
      padding = i;
      break;
    }
  }
  return padding;
}
