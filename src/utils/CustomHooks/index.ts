import { useEffect, useLayoutEffect, useMemo } from 'react';
import { makeImmHook } from './makeImmHook';
import { useThrottled } from './useThrottled';

export const useImmEffect = makeImmHook(useEffect);
export const useImmLayoutEffect = makeImmHook(useLayoutEffect);
export const useImmMemo = makeImmHook(useMemo);
export { useCounter } from './useCounter';
export { useMemoRef } from './useMemoRef';
export { useThrottled } from './useThrottled';
export { useDataBufferState } from './useDataBufferState';
export { useDataBuffer } from './useDataBuffer';
export const useImmThrottled = makeImmHook(useThrottled);
