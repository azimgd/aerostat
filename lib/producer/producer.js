import init from '../init';
import utils from '../utils/utils';
import config from '../config';

const Creator = (state) => ({
  /**
   * Creates and saves a new job into kue
   */
  create: () => {
    let job = init().queue().create(state.name, state.data);

    if (config.removeOnComplete) {
      job = job.removeOnComplete(config.removeOnComplete);
    }

    if (config.delay) {
      job = job.delay(config.delay);
    }

    if (config.ttl) {
      job = job.ttl(config.ttl);
    }

    if (config.priority) {
      job = job.priority(config.priority);
    }

    job.save();
  },
});

const Producer = (name, data) => {
  data = utils().encode(data);
  let state = {
    name,
    data,
  };

  return Object.assign(
    {},
    Creator(state)
  );
};

export default Producer;
