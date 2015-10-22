import kue from 'kue';
import config from './config';

const Init = () => {
  /**
   *
   */
  const craeteKueQueue = () => {
    return kue.createQueue()
  }

  /**
   *
   */
  const start = () => {
    console.log(config.kue.port);
    if(config.kue.port) {
      kue.app.listen(config.kue.port);
    }
  }

  return {
    start: start,
    queue: craeteKueQueue
  }
}

export default Init;
