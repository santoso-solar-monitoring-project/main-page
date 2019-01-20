import React, { useEffect } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { CustomHookType } from '.';

export interface ArgsType {
  event: string;
  first: () => void;
  last: () => void;
  timeout: number;
}

export type DefaultArgsType = Partial<ArgsType>;
export type ImmDefaultArgsType = ImmMapType<DefaultArgsType>;

export const defaultArgs: ImmDefaultArgsType = Imm.fromJS({
  first: () => {},
  last: () => {},
  timeout: 250,
});

type UseThrottledType = CustomHookType<DefaultArgsType>;

export const useThrottled: UseThrottledType = (
  args: DefaultArgsType,
  inputs?: React.InputIdentityList
) => {
  useEffect(() => {
    // unpack args
    const {
      event,
      first,
      last,
      timeout,
    }: DefaultArgsType = defaultArgs.mergeDeep(args).toJS();
    if (!event) return;

    let ongoing = false;
    let id: number;

    const handler = () => {
      // first resize event
      if (!ongoing) {
        first!();
        ongoing = true;
      }

      // dismiss pending events
      if (id) clearTimeout(id);

      // fulfill last response after timeout
      id = window.setTimeout(() => {
        ongoing = false;
        last!();
      }, timeout);
    };

    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, inputs);
};

useThrottled.defaultArgs = defaultArgs.toJS();
