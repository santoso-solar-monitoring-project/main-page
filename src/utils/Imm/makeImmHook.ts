import React from 'react';
import { ImmMapType, fromJS } from 'utils/Imm';
import { useMemoRef } from 'utils/CustomHooks';

type Callable = (...args: any[]) => any;

type UseCallBackCase<
  T,
  X extends Callable,
  Else = never
> = T extends typeof React.useCallback ? X : Else;

type UseEffectCase<
  T,
  X extends Callable,
  Else = never
> = T extends typeof React.useEffect ? void : Else;

type UseMemoCase<T, X extends Callable, Else = never> = X extends () => any
  ? ReturnType<X>
  : Else;

export function makeImmHook<
  T extends (arg: any, inputs: React.InputIdentityList) => any
>(hook: T) {
  function ImmHook<X extends Callable>(
    arg: X,
    inputs: React.InputIdentityList
  ): UseCallBackCase<T, X, UseEffectCase<T, X, UseMemoCase<T, X>>> {
    const savedInputs = useMemoRef<ImmMapType>(
      () => fromJS(inputs).toMap(),
      []
    );
    savedInputs.current = savedInputs.current.mergeDeep(fromJS(inputs).toMap());
    return hook(arg, [savedInputs.current]);
  }

  return ImmHook;
}

// Test case (hover/uncomment to see types):
// const aaaa = makeImmHook(React.useCallback);
// const bbbb = aaaa(() => 3, []);
// const cccc = makeImmHook(React.useEffect);
// const dddd = cccc(() => 3, []); // number
// const eeee = makeImmHook(React.useMemo);
// const ffff = eeee(() => 3, []); // number
// const gggg = aaaa(3, []); // [ts] Argument of type '3' is not assignable to parameter of type '() => {}'. [2345]
