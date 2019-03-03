import { Omit, Equals, RequiredOnly, ArrayToIntersectionNonNull } from './meta';
import * as withImm from './Imm/withImm';
import warn from './warn';

export type PropsClass = {
  required?: object;
  defaults?: object;
  injected?: object;
};

type Mix<T> = Pick<T, keyof T>;

// Returns a factory that applies default props to props
export function declare<P extends PropsClass, S extends PropsClass[]>(
  propsClass: P,
  ...baseClasses: S
) {
  type R = P['required'] & {};
  type D = P['defaults'] & {};
  type I = P['injected'] & {};

  type BasesR<T> = T extends PropsClass ? T['required'] : {};
  type BasesD<T> = T extends PropsClass ? T['defaults'] : {};
  type BasesI<T> = T extends PropsClass ? T['injected'] : {};
  type BaseClasses = ArrayToIntersectionNonNull<S>;

  // Properties in `propsClass.defaults` will make inherited properties with the same name optional, but will not affect properties in `propsClass.required`.
  type Defaults = Mix<D & BasesD<BaseClasses>>;
  type Required = Mix<R & Omit<BasesR<BaseClasses>, keyof Defaults>>;
  type Injected = Mix<I & BasesI<BaseClasses>>;

  // External-facing props interface
  type PropsIn = Mix<Required & Partial<Defaults> & Partial<Injected>>;
  // Internal-facing props interface
  type PropsOut = Mix<Required & Defaults & Injected>;

  const defaults = withImm.merge(
    ...baseClasses.map(base => base.defaults),
    propsClass.defaults as D
  ) as Defaults;

  // Warn about bad behavior with React refs
  Object.keys(defaults).forEach(key => {
    if (key === 'children') {
      warn(`Don't use a default children prop! Refs will be lost.`);
    } else if (
      typeof defaults[key as keyof Defaults] === 'object' &&
      'current' in defaults[key as keyof Defaults]
    ) {
      warn(
        `Found an default property with a 'current' property. If this is a 'React.RefObject' beware that the ref may be lost! ${key}:`,
        defaults[key as keyof Defaults]
      );
    }
  });

  type Me = { required: Required; defaults: Defaults; injected: Injected };

  function extend<T extends PropsClass, U extends PropsClass[]>(
    this: Me,
    propsClass: T,
    ...baseClasses: U
  ) {
    // Need to phrase it like this for type inference...
    return declare(propsClass, declare(this, ...baseClasses));
  }

  const types = {
    // Default arguments
    defaults: defaults as { [K in keyof Defaults]: Defaults[K] },
    // Required arguments
    required: {} as { [K in keyof Required]: Required[K] },
    // Values supplied not at the call site
    injected: {} as { [K in keyof Injected]: Injected[K] },
    // External-facing props interface (type)
    propsIn: {} as { [K in keyof PropsIn]: PropsIn[K] },
    // Internal-facing props interface (type)
    propsOut: {} as { [K in keyof PropsOut]: PropsOut[K] },
    // Class with my own required and defaults, discounting inherited properties
    own: propsClass as { [K in keyof PropsClass]-?: P[K] & {} },
    // List of base classes (filtered to just show their PropsClass fields)
    bases: (baseClasses as unknown) as {
      [K in keyof S]: S[K] extends PropsClass
        ? { [L in keyof PropsClass]-?: S[K][L] }
        : S[K]
    },
    // Shortcut to declare() with this DefaultProps object as the baseClass
    extend,
  };

  // Type expanded inline for better tooltip
  type Factory = (
    props: { [K in keyof PropsIn]: PropsIn[K] }
  ) => { [K in keyof PropsOut]: PropsOut[K] };

  const factory: Factory = props => {
    return {
      ...props,
      ...withImm.mergeIntersect(defaults, props),
    } as ReturnType<Factory>;
  };

  // Runtime check for whether all props specified are optional (defaults or injected)
  const allOptional = ![propsClass, ...baseClasses].some(c => 'required' in c);

  type Decorated<T> = <U extends any[], V>(
    props: PropsIn,
    placeholder?: V,
    ...rest: U
  ) => T extends (...args: any[]) => infer W ? W : any;

  type DecoratedOptional<T> = <U extends any[], V>(
    props?: PropsIn,
    placeholder?: V,
    ...rest: U
  ) => T extends (...args: any[]) => infer W ? W : any;

  type AcceptsPropsOut = (props: PropsOut, ...rest: any[]) => any;

  class Wrap {
    // Decorator accepting a function whose props are to be transformed
    static default<T extends AcceptsPropsOut>(f: T) {
      const decorated: Decorated<T> = (props, placeholder, ...rest) => {
        return f(
          factory(props as Parameters<Factory>[0]),
          placeholder,
          ...rest
        );
      };

      return Object.assign(decorated, types, { wrap: Wrap.default });
    }

    // Decorator accepting a function whose props are to be transformed where the props argument is optional.
    static optional<T extends AcceptsPropsOut>(f: T) {
      const decorated: DecoratedOptional<T> = (props, placeholder, ...rest) => {
        return f(
          factory(props as Parameters<Factory>[0]),
          placeholder,
          ...rest
        );
      };

      return Object.assign(decorated, types, { wrap: Wrap.optional });
    }

    // Select which Wrap signature to use depending on allOptional
    static decorator = (allOptional ? Wrap.optional : Wrap.default) as Equals<
      RequiredOnly<Required>,
      {},
      typeof Wrap.optional,
      typeof Wrap.default
    >;
  }

  return Object.assign(factory, types, { wrap: Wrap['decorator'] });
}

export function required<T extends object, S extends object[] = []>(
  ..._others: S
) {
  type Others = ArrayToIntersectionNonNull<S>;
  return declare(
    class {
      static required: T & Others;
    }
  );
}

// Arguments are deeply merged in reverse order.
export function defaults<T extends object[]>(...values: T) {
  return declare(
    class {
      static defaults = withImm.merge(...(values.reverse() as T));
    }
  );
}

export function injected<T extends object, S extends object[] = []>(
  ..._others: S
) {
  type Others = ArrayToIntersectionNonNull<S>;
  return declare(
    class {
      static injected: T & Others;
    }
  );
}

// Test usage:
// import React from 'react';
// import { GoodCanvasElement } from 'components/GoodCanvas';
// import { BaseProps } from 'utils/BaseProps';
// import noop from 'utils/noop';
// class Props {
//   static required: {
//     canvasRef: React.RefObject<GoodCanvasElement> | 5;
//     // canvasStyle: number;
//   };
//   static defaults = {
//     // canvasStyle: {},
//     canvasEffects: noop,
//     canvasNeedsUpdate: 0,
//   };
// }

// class PropsB {
//   static required: {
//     canvasRef: React.RefObject<GoodCanvasElement> | 5;
//     canvasStyle: { hi: number }; // required if not parent
//   };
//   static defaults = {
//     canvasStyle: {}, // only applied on inheritance
//     canvasEffects: noop,
//     canvasNeedsUpdate: 0,
//   };
// }

// const a = bind(
//   Props,
//   // [1, 2],
//   // withDefault(Props),
//   // { hi: 'world', defaults: { ddd: 4 }, required: { hello: 'world' } },
//   PropsB
// );
// const c = a.required;
// const d = a.defaults;
// const e = a.own.required;
// const f = a.own.defaults;
// const g = a.bases;
// const h = a.propsIn;
// const i = a.propsOut;
// const j = a.decorate;
// const b = a({ canvasRef: 5, canvasNeedsUpdate: 3 });
// type DefaultProps = Pick<typeof b, keyof typeof b>;
