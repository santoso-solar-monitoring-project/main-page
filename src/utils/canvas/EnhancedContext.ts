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
  canvas: typeof GoodCanvasElement.propsOut;
}
