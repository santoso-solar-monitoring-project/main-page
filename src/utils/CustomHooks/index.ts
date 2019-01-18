import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useMemoRef } from './useMemoRef';
import { useThrottled } from './useThrottled';
import { makeImmHook } from './makeImmHook';

export const useImmEffect = makeImmHook(useEffect);
export const useImmLayoutEffect = makeImmHook(useLayoutEffect);
export const useImmMemo = makeImmHook(useMemo);
export { useCounter } from './useCounter';
export { useMemoRef } from './useMemoRef';
export { useThrottled } from './useThrottled';
export const useImmMemoRef = makeImmHook(useMemoRef);
export const useImmThrottled = makeImmHook(useThrottled);
