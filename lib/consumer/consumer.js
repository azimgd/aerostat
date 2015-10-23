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
    const url = (config.baseUrl || '') + state.request.url;

    return axios({
      url: url,
      method: state.request.method,
      data: state.request.payload
    });
  },

  /**
   * Validate response of performed request
   */
  validate: (res) => {
    const response = { payload: state.request.payload, response: res };

    if(state.onValidate) {
      return Q.fcall(state.onValidate, response).then(() => response);
    }

    return response;
  },

  /**
   * On successful validation of request
   */
  success: (res) => {
    const response = { payload: state.request.payload, response: res };

    if(state.onSuccess) {
      return Q.fcall(state.onSuccess, response).then(() => response);
    }

    return response;
  },

  /**
   * On failed validation of request
   */
  fail: (res) => {
    const response = { payload: state.request.payload, response: res };

    if(state.onFail) {
      return Q.fcall(state.onFail, response).then(() => response);
    }

    return response;
  },

  /**
   * Final action to be done after request is parsed and validated
   */
  summarize: (res) => {
    if(config.isRepeating) {
      producer(state.name, state.request).create();
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
    const requestState = Object.assign({}, state, { request: data });
    const request = Request(requestState);

    return request.send(data.url, data.method, data.payload)
      .then(request.validate)
      .then(request.success)
      .catch(request.fail)
      .then(request.summarize)
      .then(done);
  },

  onSuccess: (callback) => {
    state.onSuccess = callback;
  },

  onFail: (callback) => {
    state.onFail = callback;
  },

  onValidate: (callback) => {
    state.onValidate = callback;
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
