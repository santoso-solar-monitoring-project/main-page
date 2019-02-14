import { EnhancedContext, CanvasStyle } from './EnhancedContext';
import noop from 'utils/noop';
import { declare } from 'utils/DefaultProps';
import warn from 'utils/warn';
import { useImm } from 'utils/Imm';
import { useMemo } from 'react';

export type CanvasEffect = (ctx: EnhancedContext) => void;

export const EffectOptions = declare(
  class {
    static defaults = {
      style: {} as CanvasStyle,
      injectEffect: noop as CanvasEffect,
    };
  }
);

const Options = declare(
  class {
    static defaults = {
      inputs: undefined as React.InputIdentityList | void,
      injection: false,
    };
  },
  EffectOptions
);

export function newEffect(
  effect: CanvasEffect,
  options: typeof Options.propsIn = {}
) {
  const { style, injectEffect, inputs, injection } = Options(options);

  if (inputs != null)
    return useImm(useMemo)(
      () => effectChain as typeof Resolver['newEffect'],
      inputs
    );
  else return effectChain as typeof Resolver['newEffect'];

  function effectChain(
    ...children: [EnhancedContext] | (CanvasEffect | null)[]
  ) {
    const render = (ctx: EnhancedContext) => {
      const execute = () => {
        Object.assign(ctx, style);
        injectEffect(ctx);
        effect(ctx);
        (children as (CanvasEffect | null)[])
          .filter(Boolean)
          .forEach(e => e!(ctx));
      };

      if (injection) {
        execute();
      } else {
        ctx.isolate(execute);
      }
    };

    if (Resolver.isEnhancedContext(children[0])) {
      const ctx = children[0];
      if (children.length > 1) {
        warn(
          'This effect is ignoring the children it received because a canvas context was passed as its first argument. This is probably a programmer mistake. Ignored:',
          children.slice(1)
        );
      }
      children = [];
      return render(ctx);
    } else {
      return render;
    }
  }
}

export class Resolver {
  static newEffect(ctx: EnhancedContext): void;
  static newEffect(...children: (CanvasEffect | null)[]): CanvasEffect;
  static newEffect(...children: [EnhancedContext] | (CanvasEffect | null)[]) {
    return {} as void | CanvasEffect;
  }
  static isEnhancedContext(
    arg: EnhancedContext | CanvasEffect | null
  ): arg is EnhancedContext {
    return (
      arg instanceof CanvasRenderingContext2D && arg.currentTransform != null
    );
  }
}
