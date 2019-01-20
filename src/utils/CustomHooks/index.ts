import { useEffect, useLayoutEffect, useMemo } from 'react';
import { makeImmHook } from './makeImmHook';
import { useThrottled } from './useThrottled';
import { _CustomHookType } from './_CustomHookType';
export type CustomHookType<T, R = void> = _CustomHookType<T, R>;

export const useImmEffect = makeImmHook(useEffect);
export const useImmLayoutEffect = makeImmHook(useLayoutEffect);
export const useImmMemo = makeImmHook(useMemo);
export { useCounter } from './useCounter';
export { useMemoRef } from './useMemoRef';
export { useThrottled } from './useThrottled';
export { useDataBuffer } from './useDataBuffer';
export { useDataBufferSilent } from './useDataBufferSilent';
export const useImmThrottled = makeImmHook(useThrottled);
