import React, { useEffect } from 'react';
import { withImm } from 'utils/Imm';

export interface Args {
  event: string;
  first: () => void;
  last: () => void;
  timeout?: number;
}

export const defaultArgs = {
  timeout: 250,
};

export function useThrottled(args: Args, inputs?: React.InputIdentityList) {
  useEffect(() => {
    const { event, first, last } = args;
    const { timeout } = withImm.merge(defaultArgs, args);
    if (!event) return;

    let ongoing = false;
    let id: number;

    const handler = () => {
      // first resize event
      if (!ongoing) {
        if (first) first();
        ongoing = true;
      }

      // dismiss pending events
      if (id) clearTimeout(id);

      // fulfill last response after timeout
      id = window.setTimeout(() => {
        ongoing = false;
        if (last) last();
      }, timeout);
    };

    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, inputs);
}
