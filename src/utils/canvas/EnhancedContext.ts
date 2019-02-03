import { GoodCanvasElement } from 'components/GoodCanvas';

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
  deriveCoordinate(coord: Partial<{ width: number; height: number }>): number;
  deriveXY(
    coords: Partial<{
      x: Partial<{ width: number; height: number }>;
      y: Partial<{ width: number; height: number }>;
    }>
  ): { x: number; y: number };
  readonly canvas: typeof GoodCanvasElement.propsOut;
  readonly width: number;
  readonly height: number;
}
