'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _init = require('../init');

var _init2 = _interopRequireDefault(_init);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var _producerProducer = require('../producer/producer');

var _producerProducer2 = _interopRequireDefault(_producerProducer);

var Request = function Request(state) {
  return {
    /**
     * Perform a request to url with specified method and payload
     * returns a promise
     */
    send: function send() {
      var url = (_config2['default'].baseUrl || '') + state.request.url;

      return (0, _axios2['default'])({
        url: url,
        method: state.request.method,
        data: state.request.payload
      });
    },

    /**
     * Validate response of performed request
     */
    validate: function validate(res) {
      var response = {
        payload: state.request.payload,
        response: res,
        timestamp: (0, _utilsUtils2['default'])().timestamp()
      };

      if (state.onValidate) {
        return _q2['default'].fcall(state.onValidate, response).then(function () {
          return response;
        });
      }

      return response;
    },

    /**
     * On successful validation of request
     */
    success: function success(res) {
      var response = {
        payload: state.request.payload,
        response: res,
        timestamp: (0, _utilsUtils2['default'])().timestamp()
      };

      if (state.onSuccess) {
        return _q2['default'].fcall(state.onSuccess, response).then(function () {
          return response;
        });
      }

      return response;
    },

    /**
     * On failed validation of request
     */
    fail: function fail(res) {
      var response = {
        payload: state.request.payload,
        response: res,
        timestamp: (0, _utilsUtils2['default'])().timestamp()
      };

      if (state.onFail) {
        return _q2['default'].fcall(state.onFail, response).then(function () {
          return response;
        });
      }

      return response;
    },

    /**
     * Final action to be done after request is parsed and validated
     */
    summarize: function summarize(res) {
      if (_config2['default'].isRepeating) {
        (0, _producerProducer2['default'])(state.name, state.request).create();
      }
    }
  };
};

var Digestor = function Digestor(state) {
  return {
    /**
     * Callback function for consumer method,
     * triggered when the job is popped from the queue
     */
    callback: function callback(job, done) {
      var data = (0, _utilsUtils2['default'])().decode(job.data);
      var requestState = Object.assign({}, state, { request: data });
      var request = Request(requestState);

      return request.send(data.url, data.method, data.payload).then(request.validate).then(request.success)['catch'](request.fail).then(request.summarize).then(done);
    },

    onSuccess: function onSuccess(callback) {
      state.onSuccess = callback;
    },

    onFail: function onFail(callback) {
      state.onFail = callback;
    },

    onValidate: function onValidate(callback) {
      state.onValidate = callback;
    },

    /**
     * Process popped job from the queue
     */
    consume: function consume(callback) {
      (0, _init2['default'])().queue().process(state.name, callback);
    }
  };
};

var Consumer = function Consumer(name) {
  var state = {
    name: name
  };

  return Object.assign({}, Digestor(state));
};

exports['default'] = Consumer;
module.exports = exports['default'];