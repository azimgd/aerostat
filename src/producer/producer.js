import init from '../init';
import utils from '../utils/utils';
import config from '../config';

const Creator = (state) => ({
  /**
   * Creates and saves a new job into kue
   */
  create: (priorityConfig) => {
    let job = init().queue().create(state.name, state.data);

    if (priorityConfig.removeOnComplete || config.removeOnComplete) {
      const removeOnComplete = priorityConfig.removeOnComplete || config.removeOnComplete;
      job = job.removeOnComplete(removeOnComplete);
    }

    if (priorityConfig.delay || config.delay) {
      const delay = priorityConfig.delay || config.delay;
      job = job.delay(delay);
    }

    if (priorityConfig.ttl || config.ttl) {
      const ttl = priorityConfig.ttl || config.ttl;
      job = job.ttl(ttl);
    }

    if (priorityConfig.priority || config.priority) {
      const priority = priorityConfig.priority || config.priority;
      job = job.priority(priority);
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
