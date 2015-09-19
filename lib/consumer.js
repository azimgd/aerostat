let init = require('../init');

class Consumer {
  constructor() {
  }

  process(name, producer) {
    init.queue.process(name, (job, done) => {
      console.log(job.data);

      if(producer) {
        producer();
      }

      done();
    });
  }
}

let consumer = () => new Consumer;
export default consumer;
