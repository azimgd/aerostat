let init = require('../init');
let Request = require('./request')();
let unflatten = require('flat').unflatten;

class Consumer {
  constructor(options = {}) {
    this.infinite = options.infinite || false;
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
      //@TODO: extract this to separate class
      job.data = unflatten(job.data);

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
         * Queueing next job, to make infinite loop of delayed tasks
         */
        if(this.infinite && producer) {
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
