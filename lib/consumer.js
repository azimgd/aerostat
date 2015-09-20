let init = require('../init');
let Request = require('./request')();
let unflatten = require('flat').unflatten;

class Consumer {
  constructor() {
  }

  process(url, method, data) {
    return Request.send(url, method, data).then((res) => {
      return res;
    }, (err) => {
      return false;
    });
  }

  consume(name, producer, success, failure) {
    if(!producer) {
      throw new Error('Producer function is not defined');
    }

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
        producer();
        done();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}

let consumer = () => new Consumer;
export default consumer;
