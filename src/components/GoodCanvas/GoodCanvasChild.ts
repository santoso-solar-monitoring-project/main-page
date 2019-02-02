import React from 'react';
import { GoodCanvasElement } from '.';
import { BaseProps } from 'utils/BaseProps';
import noop from 'utils/noop';
import { declare } from 'utils/DefaultProps';
import { EnhancedContext } from 'utils/canvas';

export const Props = declare(
  class {
    static defaults = {
      canvasStyle: {} as Partial<EnhancedContext>,
      canvasEffects: noop as (ctx: EnhancedContext) => void,
      canvasNeedsUpdate: 0,
    };
    static injected: {
      canvasRef: React.RefObject<typeof GoodCanvasElement.propsOut>;
    };
  },
  BaseProps
);

export const OwnProps = declare(Props.own);

// Test usage:
// const a = bind(Props, BaseProps);
// const c = a.required;
// const d = a.defaults;
// const e = a.own.required;
// const f = a.own.defaults;
// const g = a.bases;
// const h = a.propsIn;
// const i = a.propsOut;
// const j = a.decorate;
// const b = a({ canvasNeedsUpdate: 3 });
// type DefaultProps = Pick<typeof b, keyof typeof b>;
