import init from '../init';

class Producer {
  constructor(config) {
    this.config = config;
  }

  create(name, data) {
    let job = init.queue.create(name, data).removeOnComplete(true);

    if(this.config.delay) {
      job = job.delay(this.config.delay).ttl(this.config.delay + 5000);
    }

    if(this.config.priority) {
      job = job.priority(this.config.priority);
    }

    job.save();
  }
}

export default Producer;
