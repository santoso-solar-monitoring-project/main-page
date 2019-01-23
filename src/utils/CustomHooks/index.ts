import { _CustomHookType } from './_CustomHookType';
export type CustomHookType<T, R = void> = _CustomHookType<T, R>;

export { useCounter } from './useCounter';
export { useMemoRef } from './useMemoRef';
export { useThrottled } from './useThrottled';
export { useDataBuffer } from './useDataBuffer';
export { useDataBufferSilent } from './useDataBufferSilent';
export { useImm } from './useImm';
