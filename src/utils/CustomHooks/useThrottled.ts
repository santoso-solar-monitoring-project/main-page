import React, { useEffect } from 'react';
import noop from 'utils/noop';
import { declare, required, defaults } from 'utils/DefaultProps';

const Args = declare(
  required<{ event: string }>(),
  defaults({
    timeout: 250,
    first: noop,
    last: noop,
  })
);

export const useThrottled = Args.wrap(
  ({ event, first, last, timeout }, inputs?: React.InputIdentityList) => {
    useEffect(() => {
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
);
