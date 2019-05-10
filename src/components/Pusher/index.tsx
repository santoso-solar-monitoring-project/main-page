import Pusher from 'pusher-js';
import config from './pusher.config.json';

const pusher = new Pusher(config.key, config.options);

config.channelIDs.forEach(ch => {
  pusher.subscribe(ch);
});

export default pusher;
