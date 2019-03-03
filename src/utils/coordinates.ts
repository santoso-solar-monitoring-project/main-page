export function deriveCoordinate(
  this: { width: number; height: number },
  coord: Partial<{ width: number; height: number }>
) {
  const { width: w = 0, height: h = 0 } = coord;
  const { width, height } = this;
  const result = w * width + h * height;
  return result;
}

export function deriveCoordinates(
  this: { width: number; height: number },
  {
    x = {},
    y = {},
  }: Partial<{
    x: Partial<{ width: number; height: number }>;
    y: Partial<{ width: number; height: number }>;
  }>
) {
  return {
    x: deriveCoordinate.call(this, x),
    y: deriveCoordinate.call(this, y),
  };
}
