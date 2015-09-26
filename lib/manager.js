let consumer = require('./consumer');
let producer = require('./producer');
let init = require('../init');
let Q = require('q');
let _ = require('lodash');
let Utils = require('./utils')();

class Manager {
  constructor(consumer, producer, options = {}) {
    let isRepeatingQueue = options.repeating || false;
    let delay = options.delay || 5000;

    this.consumer = consumer({
      repeating: isRepeatingQueue
    });
    this.producer = producer({
      delay: delay
    });
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

  init(name, data, success, failure) {
    /**
     * transforming data into required format
     * because kue is not able to save nested json
     */
    data = Utils.encode(data);
    let jobFunction = () => this.producer.create(name, data);

    this.delayedJobExists(name).then((exists) => {
      if(!exists) {
        jobFunction();
      }

      this.clearQueue(name, 'active');
    })
    .then(() => {
      this.consumer.consume(name, () => jobFunction(), success, failure );
    })
    .done();
  }
}

let manager = (options) => new Manager(consumer, producer, options);
export default manager;
