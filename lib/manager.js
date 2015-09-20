let consumer = require('./consumer');
let producer = require('./producer');
let init = require('../init');
let Q = require('q');

class Manager {
  constructor(consumer, producer) {
    this.consumer = consumer();
    this.producer = producer();
  }

  clearQueue(name, state = 'delayed') {
    init.kue.Job.rangeByType(name, state, 0, 100, 'asc', (err, jobs) => {
      jobs.forEach((job) => {
        job.remove(() => { console.log('removed', job.id); });
      });
    });
  }

  delayedJobExists(name) {
    return Q.ninvoke(init.kue.Job, 'rangeByType', name, 'delayed', 0, 1, 'asc')
      .then((jobs) => {
        return Boolean(jobs.length);
      });
  }

  init(name, data) {
    let jobFunction = () => this.producer.create(name, data);

    this.delayedJobExists(name).then((exists) => {
      if(!exists) {
        jobFunction();
      }

      this.clearQueue(name, 'active');
    })
    .then(() => {
      this.consumer.consume(name, () => jobFunction() );
    })
    .done();
  }
}

let manager = () => new Manager(consumer, producer);
export default manager;
