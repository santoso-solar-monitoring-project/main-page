import React from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { useMemoRef } from 'utils/CustomHooks';

export function makeImmHook<
  T extends (arg: any, inputs: React.InputIdentityList) => any,
  U = Parameters<T>[0]
>(hook: T) {
  function ImmHook<V extends U>(
    arg: V,
    inputs: React.InputIdentityList
  ): V extends (...args: any[]) => infer R ? R : ReturnType<T> {
    const savedInputs = useMemoRef<ImmMapType>(() =>
      Imm.fromJS(inputs).toMap()
    );
    savedInputs.current = savedInputs.current.mergeDeep(
      Imm.fromJS(inputs).toMap()
    );
    return hook(arg, [savedInputs.current]);
  }

  return ImmHook;
}

// Test case (hover/uncomment to see types):
const aaaa = makeImmHook(React.useMemo);
const bbbb = aaaa(() => 3, []); // number
// const cccc = aaaa(3, []); // [ts] Argument of type '3' is not assignable to parameter of type '() => {}'. [2345]
