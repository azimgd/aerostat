import Q from 'q';
import axios from 'axios';
import init from '../init';
import config from '../config';
import utils from '../utils/utils';
import producer from '../producer/producer';

const Request = (state) => ({
  /**
   *
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
   *
   */
  validate: (res) => {
    if(res.status != 200) {
      throw new Error('Request has failed');
    }

    return res;
  },

  /**
   *
   */
  success: (res) => {
    console.log(res.data, 'success');

    return res;
  },

  /**
   *
   */
  fail: (res) => {
    console.log(res, 'failure');

    return res;
  },

  /**
   *
   */
  summarize: (res) => {
    if(config.isRepeating) {
      producer(state.name, state.data).create();
    }
  }
});


const Digestor = (state) => ({
  /**
   *
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
   *
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
