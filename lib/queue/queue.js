import Q from 'q';
import init from '../init';
import config from '../config';
import kue from 'kue';

const Manager = (state) => ({
  /**
   * Returns array of maximum n jobs which have specified type and state
   */
  rangeByType: (type, state = 'delayed', range = 200) => {
    return Q.ninvoke(kue.Job, 'rangeByType', type, state, 0, range, 'asc');
  },

  /**
   * Returns array of maximum n jobs which have specified state
   */
  rangeByState: (state = 'delayed', range = 200) => {
    return Q.ninvoke(kue.Job, 'rangeByState', state, 0, range, 'asc');
  },

  /**
   * Removes each array of jobs from kue
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
