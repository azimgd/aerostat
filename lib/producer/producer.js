import init from '../init';
import config from '../config';

/**
 *
 */
const Creator = (state) => ({
  create: () => {
    let job = init().queue().create(state.name, state.data);

    if(config.kue.removeOnComplete) {
      job = job.removeOnComplete(config.kue.removeOnComplete)
    }

    if(config.kue.delay) {
      job = job.delay(config.kue.delay);
    }

    if(config.kue.ttl) {
      job = job.ttl(config.kue.ttl);
    }

    if(config.kue.priority) {
      job = job.priority(config.kue.priority);
    }

    job.save();
  }
})

const Producer = (name, data) => {
  let state = {
    name,
    data
  };

  return Object.assign(
    {},
    Creator(state)
  );
}

export default Producer;
