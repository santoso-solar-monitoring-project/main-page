import React, { useEffect } from 'react';
import noop from 'utils/noop';
import { withImm } from 'utils/Imm';

const defaults = {
  timeout: 250,
  first: noop,
  last: noop,
};

interface Args extends Partial<typeof defaults> {
  event: string;
}

export function useThrottled(args: Args, inputs?: React.InputIdentityList) {
  useEffect(() => {
    const { event, first, last, timeout } = withImm.mergeFull(defaults, args);

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
