let consumer = require('./consumer');
let producer = require('./producer');
let init = require('../init');
let Q = require('q');

class Manager {
  constructor(consumer, producer) {
    this.consumer = consumer();
    this.producer = producer();
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
    })
    .then(() => {
      this.consumer.process(name, () => jobFunction() );
    })
    .done();
  }
}

let manager = () => new Manager(consumer, producer);
export default manager;
