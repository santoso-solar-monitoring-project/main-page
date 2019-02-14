import { GoodCanvasElement } from 'components/GoodCanvas';

export type RelativeCoordinate = Partial<{ width: number; height: number }>;
export type RelativeCoordinates = Partial<{
  x: RelativeCoordinate;
  y: RelativeCoordinate;
}>;
export type CanvasStyle = Partial<CanvasRenderingContext2D>;

export interface EnhancedContext extends CanvasRenderingContext2D {
  currentTransform: DOMMatrix;
  savedTransforms: DOMMatrix[];
  _setMatrix(): void;
  save(): void;
  restore(): void;
  scale(x: number, y: number): void;
  rotate(theta: number): void;
  translate(x: number, y: number): void;
  transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): void;
  resetTransform(): void;
  isolate(f: () => void): void;
  call<T extends any[]>(
    f: (...args: T) => any,
    ...args: T
  ): T extends (...args: any[]) => infer W ? W : any;
  deriveCoordinate(coord: RelativeCoordinate): number;
  deriveXY(coords: RelativeCoordinates): { x: number; y: number };
  readonly canvas: typeof GoodCanvasElement.propsOut;
  readonly width: number;
  readonly height: number;
}
