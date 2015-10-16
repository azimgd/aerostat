import Consumer from './consumer';
import Producer from './producer';
import init from '../init';
import Q from 'q';
import _ from 'lodash';
import Config from './stores/config';
import Utils from './utils';

class Manager {
  constructor() {
    this.config = new Config();
    this.consumer = new Consumer(this.config);
    this.producer = new Producer(this.config);
    this.utils = Utils();
  }

  /**
   *
   */
  setConfig(data) {
    if(data.isRepeating !== undefined) {
      this.config.isRepeating = data.isRepeating;
    }

    if(data.rootUrl !== undefined) {
      this.config.rootUrl = data.rootUrl;
    }

    if(data.delay !== undefined) {
      this.config.delay = data.delay;
    }

    if(data.priority !== undefined) {
      this.config.priority = data.priority;
    }
  }

  /**
   *
   */
  getConfig() {
    return {
      isRepeating: this.config.isRepeating,
      rootUrl: this.config.rootUrl,
      delay: this.config.delay
    }
  }

  /**
   *
   */
  rangeByType(type, state = 'delayed') {
    return Q.ninvoke(init.kue.Job, 'rangeByType', type, state, 0, 1, 'asc');
  }

  /**
   *
   */
  rangeByState(state = 'delayed') {
    return Q.ninvoke(init.kue.Job, 'rangeByType', state, 0, 1, 'asc');
  }

  /**
   *
   */
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

  /**
   *
   */
  delayedJobExists(name) {
    return this.rangeByType(name)
      .then((jobs) => {
        return Boolean(jobs.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   *
   */
  listByType(type, state = 'delayed') {
    return this.rangeByType(type, state);
  }

  listByState(state = 'delayed') {
    return this.rangeByState(type);
  }

  /**
   *
   */
  init(name, data, success, failure) {
    data = this.utils.encode(data);
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

let manager = () => new Manager();
export default manager;
