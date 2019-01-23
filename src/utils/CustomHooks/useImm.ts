import React, { useMemo } from 'react';
import { makeImmHook } from 'utils/Imm';
export function useImm<
  T extends (arg: any, inputs: React.InputIdentityList) => any
>(hook: T) {
  const ImmHook = useMemo(() => makeImmHook(hook), []);

  return ImmHook;
}

// Test case (hover/uncomment to see types):
const aaaa = useImm(React.useMemo);
const bbbb = aaaa(() => 3, []); // number
// const cccc = aaaa(3, []); // [ts] Argument of type '3' is not assignable to parameter of type '() => {}'. [2345]
