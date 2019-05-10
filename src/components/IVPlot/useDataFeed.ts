import { useEffect } from 'react';
import { Pair } from 'utils/Pair';
import { useDataBufferSilent } from 'utils/CustomHooks';
import { declare, required, defaults } from 'utils/DefaultProps';
import pusher from 'components/Pusher';
import pusherConfig from 'components/Pusher/pusher.config.json';
import { LOG } from './LOG';

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
    channelName: string;
  }>(),
  defaults({
    maxSize: 100,
    initialValue: [] as Pair[],
  })
);

export const useDataFeed = Args.wrap(
  ({ samplePeriod, maxSize, initialValue, channelName }) => {
    const [buffer, append] = useDataBufferSilent<Pair>({
      maxSize,
      initialValue,
    });

    useEffect(() => {
      if (channelName === 'debug') {
        let id: number;

        const receiveData = () => {
          append(generate());
          id = window.setTimeout(
            receiveData,
            samplePeriod + 250 * (Math.random() - 0.5)
          );
        };
        receiveData();

        return () => clearTimeout(id);
      } else {
        const channel = pusher.channels.channels[channelName];
        if (!channel) {
          LOG('No Pusher channel found for ID:', channelName);
          return;
        }
        const handler = ({ payload }: { payload: Pair[] }) => {
          append(...payload);
          Object.assign(window, { buffer, payload });
        };
        channel.bind(pusherConfig.eventName, handler);
      }
    }, []);

    return buffer;
  }
);
