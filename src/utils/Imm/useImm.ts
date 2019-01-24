import React, { useMemo } from 'react';
import { makeImmHook } from 'utils/Imm';
export function useImm<
  T extends (arg: any, inputs: React.InputIdentityList) => any
>(hook: T) {
  const ImmHook = useMemo(() => makeImmHook(hook), []);

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
