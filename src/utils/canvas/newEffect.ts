import { EnhancedContext } from './EnhancedContext';
import noop from 'utils/noop';
import { declare } from 'utils/DefaultProps';

export type CanvasEffect = (ctx: EnhancedContext) => void;

export const EffectOptions = declare(
  class {
    static defaults = {
      canvasStyle: {} as Partial<EnhancedContext>,
      canvasRestyle: noop as CanvasEffect,
    };
  }
);

export function newEffect(
  effect: CanvasEffect,
  options: typeof EffectOptions.propsIn = {}
) {
  function effectChain(...children: [EnhancedContext] | CanvasEffect[]) {
    const { canvasStyle, canvasRestyle } = EffectOptions(options);

    const render = (ctx: EnhancedContext) => {
      ctx.isolate(() => {
        Object.assign(ctx, canvasStyle);
        canvasRestyle(ctx);
        effect(ctx);
        (children as CanvasEffect[]).forEach(e => e(ctx));
      });
    };

    if (Resolver.isEnhancedContext(children[0])) {
      const ctx = children[0];
      children = [];
      return render(ctx);
    } else {
      return render;
    }
  }

  return effectChain as typeof Resolver['newEffect'];
}

class Resolver {
  static newEffect(ctx: EnhancedContext): void;
  static newEffect(...children: CanvasEffect[]): CanvasEffect;
  static newEffect(...children: [EnhancedContext] | CanvasEffect[]) {
    return {} as void | CanvasEffect;
  }
  static isEnhancedContext(
    arg: EnhancedContext | CanvasEffect
  ): arg is EnhancedContext {
    return (
      arg instanceof CanvasRenderingContext2D && arg.currentTransform != null
    );
  }
}
