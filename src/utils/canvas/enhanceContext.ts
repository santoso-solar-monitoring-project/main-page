import { EnhancedContext } from '.';

// in theory, SVGMatrix will be used by the Canvas API in the future;
// in practice, we can borrow an SVG matrix today!
function createMatrix() {
  const svgNamespace = 'http://www.w3.org/2000/svg';
  return document.createElementNS(svgNamespace, 'g').getCTM();
}

// `enhanceContext` takes a 2d canvas context and wraps its matrix-changing
// functions so that `context.currentTransform` should always correspond to its
// current transformation matrix.
// Call `enhanceContext` on a freshly-fetched 2d canvas context for best
// results.
export function enhanceContext(
  context: CanvasRenderingContext2D
): EnhancedContext {
  // The main property we are enhancing the context to track
  let currentTransform = createMatrix();

  // the stack of saved matrices
  const savedTransforms = [currentTransform];

  const enhanced = {
    currentTransform,
    savedTransforms,
    // helper for manually forcing the canvas transformation matrix to
    // match the stored matrix.
    _setMatrix() {
      const m = enhanced.currentTransform!;
      context.setTransform(m.a, m.b, m.c, m.d, m.e, m.f);
    },

    save() {
      enhanced.savedTransforms.push(enhanced.currentTransform);
      context.save();
    },

    // if the stack of matrices we're managing doesn't have a saved matrix,
    // we won't even call the context's original `restore` method.
    restore() {
      if (enhanced.savedTransforms.length == 0) return;
      context.restore();
      enhanced.currentTransform = enhanced.savedTransforms.pop()!;
      enhanced._setMatrix();
    },

    scale(x: number, y: number) {
      enhanced.currentTransform = (<any>(
        enhanced.currentTransform
      )).scaleNonUniform(x, y);
      context.scale(x, y);
    },

    rotate(theta: number) {
      // canvas `rotate` uses radians, SVGMatrix uses degrees.
      enhanced.currentTransform = enhanced.currentTransform!.rotate(
        (theta * 180) / Math.PI
      );
      context.rotate(theta);
    },

    translate(x: number, y: number) {
      enhanced.currentTransform = enhanced.currentTransform!.translate(x, y);
      context.translate(x, y);
    },

    transform(
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number
    ) {
      const rhs = createMatrix()!;
      // 2x2 scale-skew matrix
      rhs.a = a;
      rhs.b = b;
      rhs.c = c;
      rhs.d = d;

      // translation vector
      rhs.e = e;
      rhs.f = f;
      enhanced.currentTransform = enhanced.currentTransform!.multiply(rhs);
      context.transform(a, b, c, d, e, f);
    },

    // Warning: `resetTransform` is not implemented in at least some browsers
    // and this is _not_ a shim.
    resetTransform() {
      enhanced.currentTransform = createMatrix();
      context.resetTransform();
    },
  };

  const handler = {
    get: (target: any, key: string) => {
      const value =
        key in enhanced
          ? (<any>enhanced)[key]
          : key in target
          ? target[key]
          : undefined;
      if (value === undefined) {
        return value;
      }
      return typeof value === 'function'
        ? (...args: any[]) => value.apply(target, args)
        : value;
    },
    set: (target: any, key: string, value: any) => {
      if (key in target) {
        target[key] = value;
      }
      return value;
    },
  };

  return new Proxy(context, handler);
}

export function testIt() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const enhanced = enhanceContext(ctx);
  const log = (msg: string) => {
    const { a, b, c, d, e, f } = enhanced.currentTransform;
    console.warn(msg, { a, b, c, d, e, f });
  };
  (<any>window).enhanced = enhanced;
  log('initial');

  enhanced.save();
  enhanced.scale(1, 2);
  log('scale(1,2)');
  enhanced.restore();

  enhanced.save();
  enhanced.translate(10, 20);
  log('translate(10,20)');
  enhanced.restore();

  enhanced.save();
  enhanced.rotate(30);
  log('rotate(30)');
  enhanced.restore();

  enhanced.save();
  enhanced.scale(1, 2);
  enhanced.translate(10, 20);
  log('scale(1,2) translate(10,20)');
  enhanced.restore();
}
