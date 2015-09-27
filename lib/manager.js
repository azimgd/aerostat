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

  rangeByType(type, state = 'delayed') {
    return Q.ninvoke(init.kue.Job, 'rangeByType', type, state, 0, 1, 'asc');
  }

  rangeByState(state = 'delayed') {
    return Q.ninvoke(init.kue.Job, 'rangeByType', state, 0, 1, 'asc');
  }

  clearQueue(name, state = 'delayed') {
    this.rangeByType(name, state)
      .then((jobs) => {
        jobs.forEach((job) => {
          job.remove(() => { console.log('removed', job.id); });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  delayedJobExists(name) {
    return this.rangeByType(name)
      .then((jobs) => {
        return Boolean(jobs.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  listByType(type, state = 'delayed') {
    return this.rangeByType(type, state);
  }

  listByState(state = 'delayed') {
    return this.rangeByState(type);
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
