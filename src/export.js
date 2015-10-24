import producer from './producer/producer';
import consumer from './consumer/consumer';
import config from './config';
import init from './init';

const dependencies = { init, producer, consumer, config };

export default dependencies;
