let init = require('../init');
let Request = require('./request')();

class Consumer {
  constructor() {
  }

  process(url, method, data) {
    return Request.send(url, method, data).then((res) => {
      return true;
    }, (err) => {
      return false;
    });
  }

  consume(name, producer) {
    if(!producer) {
      throw new Error('Producer function is not defined');
    }

    init.queue.process(name, (job, done) => {
      this.process(job.data.url, job.data.method, job.data.payload)
      .then((res) => {
        if(!res) {
          console.log('Failed request');
        }
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
