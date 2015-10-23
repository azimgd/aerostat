import kue from 'kue';
import config from './config';
import queue from './queue/queue';

const Init = () => {
  /**
   * Returns a singleton instance Kue Queue instance
   */
  const craeteKueQueue = () => {
    return kue.createQueue()
  }

  /**
   * Initializing function
   */
  const start = () => {
    if(config.kue.port) {
      kue.app.listen(config.kue.port);
    }

    if(config.removeDelayedJobs) {
      queue().rangeByState('delayed').then(queue().removeJobs);
    }

    if(config.removeActiveJobs) {
      queue().rangeByState('active').then(queue().removeJobs);
    }
  }

  return {
    start: start,
    queue: craeteKueQueue
  }
}

export default Init;
