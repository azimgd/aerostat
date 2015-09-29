let init = require('../init');
let Request = require('./request')();
let Utils = require('./utils')();

class Consumer {
  constructor(options = {}) {
    this.repeating = options.repeating || false;
  }

  process(url, method, data, doneCallback) {
    return Request.send(url, method, data).then((res) => {
      doneCallback();

      return res;
    }, (err) => {
      doneCallback(err);

      return false;
    });
  }

  consume(name, producer, success, failure) {
    let consumer = (job, done) => {
      //decoding data into required format
      job.data = Utils.decode(job.data);

      //sending payload to provided api url
      return this.process(job.data.url, job.data.method, job.data.payload, done)
      .then((res) => {
        if(!res) {
          return {err: 'Api request has failed', payload: job.data};
        }

        return {response: res, payload: job.data};
      })
      .then((res) => {
        if(res.err !== undefined) {
          failure(res);
          return false;
        }

        success(res);
      })
      .then(() => {
        //Queueing next job, to make repeating loop of delayed tasks
        if(this.repeating && producer) {
          producer();
        }
      });
    };

    init.queue.process(name, consumer);
  }
}

let consumer = (options) => new Consumer(options);
export default consumer;
