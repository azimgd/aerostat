import Q from 'q';
import axios from 'axios';
import init from '../init';
import config from '../config';
import utils from '../utils/utils';
import producer from '../producer/producer';

const Request = (state) => ({
  /**
   * Perform a request to url with specified method and payload
   * returns a promise
   */
  send: () => {
    const url = (config.url || '') + state.url;

    return axios({
      url: url,
      method: state.method,
      data: state.data
    });
  },

  /**
   * Validate response of performed request
   */
  validate: (res) => {
    if(res.status != 200) {
      throw new Error('Request has failed');
    }

    return res;
  },

  /**
   * On successful validation of request
   */
  success: (res) => {
    console.log(res.data, 'success');

    return res;
  },

  /**
   * On failed validation of request
   */
  fail: (res) => {
    console.log(res, 'failure');

    return res;
  },

  /**
   * Final action to be done after request is parsed and validated
   */
  summarize: (res) => {
    if(config.isRepeating) {
      producer(state.name, state.data).create();
    }
  }
});


const Digestor = (state) => ({
  /**
   * Callback function for consumer method,
   * triggered when the job is popped from the queue
   */
  callback: (job, done) => {
    const data = utils().decode(job.data);
    const request = Request({ name: state.name, url: 'http://azimgd.com', method: 'get', data: data });

    return request.send(data.url, data.method, data.payload)
      .then(request.validate)
      .then(request.success)
      .catch(request.fail)
      .then(request.summarize)
      .then(done);
  },

  /**
   * Process popped job from the queue
   */
  consume: (callback) => {
    init().queue().process(state.name, callback);
  }
})

const Consumer = (name) => {
  let state = {
    name
  };

  return Object.assign(
    {},
    Digestor(state)
  );
}

export default Consumer;
