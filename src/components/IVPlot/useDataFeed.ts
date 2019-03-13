import { useEffect } from 'react';
import { Pair } from 'utils/Pair';
import { useDataBufferSilent } from 'utils/CustomHooks';
import { declare, required, defaults } from 'utils/DefaultProps';
import Pusher from 'pusher-js';

const CURRENT = [3.1, 3.2, 2.1, 2.0, 2.9, 1.8, 4.5, 4.2];
const [lo, hi] = [Math.min(...CURRENT), Math.max(...CURRENT)];
const generate = (): Pair => [Date.now(), Math.random() * (hi - lo) + lo];
const _initialValue = [...Array(100)].map((_x, i) => [
  Date.now() + ((100 - 1 - i) / 100) * -10000,
  Math.random() * (hi - lo) + lo,
]);

const Args = declare(
  required<{
    samplePeriod: number; // ms
    pusher: {
      channelName: string;
    };
  }>(),
  defaults({
    pusher: {
      key: '9dfb7224d7fd60cc9c5f',
      options: { cluster: 'us2', forceTLS: true },
      event: 'new-data',
    },
    maxSize: 100,
    initialValue: [] as Pair[],
  })
);

export const useDataFeed = Args.wrap(
  ({
    samplePeriod,
    maxSize,
    initialValue,
    pusher: { key, options, channelName, event },
  }) => {
    const [buffer, concat] = useDataBufferSilent<Pair>({
      maxSize,
      initialValue,
    });

    useEffect(() => {
      if (channelName === 'debug') {
        let id: number;

        const receiveData = () => {
          concat([generate()]);
          id = window.setTimeout(
            receiveData,
            samplePeriod + 250 * (Math.random() - 0.5)
          );
        };
        receiveData();

        return () => clearTimeout(id);
      } else {
        const pusher = new Pusher(key, options);
        const channel = pusher.subscribe(channelName);
        const handler = ({ payload }: { payload: Pair[] }) => {
          concat(payload);
          Object.assign(window, { buffer, payload });
        };
        channel.bind(event, handler);

        return () => pusher.unsubscribe(channelName);
      }
    }, []);

    return buffer;
  }
);
