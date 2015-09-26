let init = require('../init');
let Request = require('./request')();
let Utils = require('./utils')();

class Consumer {
  constructor(options = {}) {
    this.repeating = options.repeating || false;
  }

  process(url, method, data) {
    return Request.send(url, method, data).then((res) => {
      return res;
    }, (err) => {
      return false;
    });
  }

  consume(name, producer, success, failure) {
    init.queue.process(name, (job, done) => {
      job.data = Utils.decode(job.data);

      this.process(job.data.url, job.data.method, job.data.payload)
      .then((res) => {
        if(!res) {
          failure();
          return;
        }

        success(res);
      })
      .then(() => {
        /**
         * Queueing next job, to make repeating loop of delayed tasks
         */
        if(this.repeating && producer) {
          producer();
        }

        done();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}

let consumer = (options) => new Consumer(options);
export default consumer;
