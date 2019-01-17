import React, { useEffect } from 'react';
import Imm, { ImmMapType } from 'utils/Imm';
import { CustomHookType } from 'utils/CustomHookType';

export interface ArgsType {
  event: string;
  before: () => void;
  after: () => void;
  timeout: number;
}

export type DefaultArgsType = Partial<ArgsType>;
export type ImmDefaultArgsType = ImmMapType<DefaultArgsType>;

export const defaultArgs: ImmDefaultArgsType = Imm.fromJS({
  before: () => {},
  after: () => {},
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
      before,
      after,
      timeout,
    }: DefaultArgsType = defaultArgs.mergeDeep(args).toJS();
    if (!event) return;

    let ongoing = false;
    let id: number;

    const handler = () => {
      // first resize event
      if (!ongoing) {
        before!();
        ongoing = true;
      }

      // dismiss pending events
      if (id) clearTimeout(id);

      // fulfill last response after timeout
      id = window.setTimeout(() => {
        ongoing = false;
        after!();
      }, timeout);
    };

    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, inputs);
};

useThrottled.defaultArgs = defaultArgs.toJS();
