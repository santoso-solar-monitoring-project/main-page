import { Omit, ArrayToIntersection } from './meta';
import { withImm } from './Imm';
import warn from './warn';

export type PropsClass = {
  required?: object;
  defaults?: object;
  injected?: object;
};

type Pretty<T> = Pick<T, keyof T>;

// Returns a factory that applies default props to props
export function declare<P extends PropsClass, S extends PropsClass[]>(
  propsClass: P,
  ...baseClasses: S
) {
  type I = P['injected'];
  type D = P['defaults'] & I;
  type R = P['required'] & Partial<I>;

  type BasesD<T> = T extends PropsClass ? T['defaults'] : {};
  type BasesR<T> = T extends PropsClass ? T['required'] : {};
  type BaseClasses = S extends { 0: any } ? ArrayToIntersection<S> : {};

  // Properties in `propsClass.defaults` will make inherited properties with the same name optional, but will not affect properties in `propsClass.required`.
  type Defaults = D & BasesD<BaseClasses>;
  type Required = R & Omit<BasesR<BaseClasses>, keyof Defaults>;

  // External-facing props interface
  type PropsIn = Required & Partial<Defaults>;
  // Internal-facing props interface
  type PropsOut = Required & Defaults;

  const defaults = withImm.mergeFull(
    ...baseClasses.map(base => base.defaults),
    propsClass.defaults as D
  ) as Pretty<Defaults>;

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

  type Factory = ((
    props: Pretty<Required> & Partial<Pretty<Defaults>>
  ) => PropsOut);

  const factory: Factory = props => {
    return { ...props, ...withImm.merge(defaults, props) } as ReturnType<
      Factory
    >;
  };

  const wrap = <T extends (props: PropsOut, ...rest: any[]) => any>(f: T) => {
    const decorated = <U extends any[], V>(
      props: Pretty<Required> & Partial<Pretty<Defaults>>,
      placeholder?: V,
      ...rest: U
    ): T extends (...args: any[]) => infer W ? W : any => {
      return f(factory(props), ...rest);
    };
    decorated.displayName = (f as any).displayName || f.name;
    return decorated;
  };

  const types = {
    defaults,
    // save dumby property `required` for its type
    required: {} as Pretty<Required>,
    // External-facing props interface (type)
    propsIn: {} as Pretty<Required> & Partial<Pretty<Defaults>>,
    // Internal-facing props interface (type)
    propsOut: {} as Pretty<Required> & Pretty<Defaults>,
    // Class with my own required and defaults, discounting inherited properties
    own: propsClass,
    // List of base classes
    bases: baseClasses,
    // Decorator accepting a function whose props are to be transformed
    wrap,
  };

  return Object.assign(factory, types);
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
