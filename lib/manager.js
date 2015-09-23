let consumer = require('./consumer');
let producer = require('./producer');
let init = require('../init');
let flatten = require('flat');
let unflatten = require('flat').unflatten;
let Q = require('q');
let _ = require('lodash');

class Manager {
  constructor(consumer, producer, options = {}) {
    let isInfiniteQueue = options.infinite || false;
    this.consumer = consumer({
      infinite: isInfiniteQueue
    });
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

  encode(data) {
    return flatten(data);
  }

  decode(data) {
    return unflatten(data);
  }

  init(name, data, success, failure) {
    /**
     * transforming data into required format
     * because kue is not able to save nested json
     */
    data = this.encode(data);
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
