let init = require('../init');

class Producer {
  constructor() {
    this.delay = 2000;
    this.priority = 'high';
  }

  create(name, data) {
    let job = init.queue.create(name, data);

    if(this.delay) {
      job.delay(this.delay);
    }

    if(this.priority) {
      job.priority(this.priority);
    }

    job.save();
  }
}

let producer = () => new Producer;
export default producer;
