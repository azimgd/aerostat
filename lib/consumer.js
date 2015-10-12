'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var init = require('../init');
var Request = require('./request');
var Utils = require('./utils')();

var Consumer = (function () {
  function Consumer() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Consumer);

    this.repeating = options.repeating || false;
    this.request = Request({ root_url: options.root_url });
  }

  _createClass(Consumer, [{
    key: 'process',
    value: function process(url, method, data, doneCallback) {
      return this.request.send(url, method, data).then(function (res) {
        doneCallback();

        return res;
      }, function (err) {
        doneCallback(err);

        return false;
      });
    }
  }, {
    key: 'consume',
    value: function consume(name, producer, success, failure) {
      var _this = this;

      var consumer = function consumer(job, done) {
        //decoding data into required format
        job.data = Utils.decode(job.data);

        //sending payload to provided api url
        return _this.process(job.data.url, job.data.method, job.data.payload, done).then(function (res) {
          if (!res) {
            return { err: 'Api request has failed', payload: job.data };
          }

          return { response: res, payload: job.data };
        }).then(function (res) {
          if (res.err !== undefined) {
            failure(res);
            return false;
          }

          success(res);
        }).then(function () {
          //Queueing next job, to make repeating loop of delayed tasks
          if (_this.repeating && producer) {
            producer();
          }
        });
      };

      init.queue.process(name, consumer);
    }
  }]);

  return Consumer;
})();

var consumer = function consumer(options) {
  return new Consumer(options);
};
exports['default'] = consumer;
module.exports = exports['default'];