import kue from 'kue';

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
    kue.app.listen(3000);
  }

  return {
    start: start,
    queue: craeteKueQueue
  }
}

export default Init;
