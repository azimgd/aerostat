import init from '../init';
import Request from './request';
import Utils from './utils';

class Consumer {
  constructor(config) {
    this.request = new Request(config);
    this.utils = Utils();
    this.config = config;
  }

  /**
   *
   */
  process(url, method, data, doneCallback) {
    return this.request.send(url, method, data).then((res) => {
      doneCallback();

      return res;
    }, (err) => {
      doneCallback(err);

      return false;
    });
  }

  /**
   *
   */
  consume(name, producer, success, failure) {
    let consumer = (job, done) => {
      //decoding data into required format
      job.data = this.utils.decode(job.data);

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
        if(this.config.isRepeating && producer) {
          producer();
        }
      });
    };

    init.queue.process(name, consumer);
  }
}

export default Consumer;
