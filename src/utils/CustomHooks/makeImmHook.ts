import React from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { useMemoRef } from 'utils/CustomHooks';

export function makeImmHook<
  T extends (arg: any, inputs: React.InputIdentityList) => any,
  U = Parameters<T>[0],
  R = ReturnType<T>
>(hook: T) {
  const useImmHook = <V extends U>(
    arg: V,
    inputs: React.InputIdentityList
  ): R => {
    const savedInputs = useMemoRef<ImmMapType>(() =>
      Imm.fromJS(inputs).toMap()
    );
    savedInputs.current = savedInputs.current.mergeDeep(
      Imm.fromJS(inputs).toMap()
    );
    return hook(arg, [savedInputs.current]);
  };

  return useImmHook;
}
