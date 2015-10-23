import Q from 'q';
import init from '../init';
import config from '../config';
import kue from 'kue';

/**
 *
 */
const Manager = (state) => ({
  /**
   *
   */
  rangeByType: (type, state = 'delayed', range = 200) => {
    return Q.ninvoke(kue.Job, 'rangeByType', type, state, 0, range, 'asc');
  },

  /**
   *
   */
  rangeByState: (state = 'delayed', range = 200) => {
    return Q.ninvoke(kue.Job, 'rangeByState', state, 0, range, 'asc');
  },

  /**
   *
   */
  removeJobs: (jobs) => {
    jobs.forEach((job) => job.remove());
  }
});

const Queue = () => {
  let state = {
  };

  return Object.assign(
    {},
    Manager(state)
  );
}

export default Queue;
