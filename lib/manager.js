'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var consumer = require('./consumer');
var producer = require('./producer');
var init = require('../init');
var Q = require('q');
var _ = require('lodash');
var Utils = require('./utils')();

var Manager = (function () {
  function Manager(consumer, producer) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, Manager);

    var isRepeatingQueue = options.repeating || false;
    var rootUrl = options.root_url || false;
    var delay = options.delay || 5000;

    this.consumer = consumer({
      repeating: isRepeatingQueue,
      root_url: rootUrl
    });
    this.producer = producer({
      delay: delay
    });
  }

  _createClass(Manager, [{
    key: 'rangeByType',
    value: function rangeByType(type) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? 'delayed' : arguments[1];

      return Q.ninvoke(init.kue.Job, 'rangeByType', type, state, 0, 1, 'asc');
    }
  }, {
    key: 'rangeByState',
    value: function rangeByState() {
      var state = arguments.length <= 0 || arguments[0] === undefined ? 'delayed' : arguments[0];

      return Q.ninvoke(init.kue.Job, 'rangeByType', state, 0, 1, 'asc');
    }
  }, {
    key: 'clearQueue',
    value: function clearQueue(name) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? 'delayed' : arguments[1];

      this.rangeByType(name, state).then(function (jobs) {
        jobs.forEach(function (job) {
          job.remove(function () {
            console.log('removed', job.id);
          });
        });
      })['catch'](function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'delayedJobExists',
    value: function delayedJobExists(name) {
      return this.rangeByType(name).then(function (jobs) {
        return Boolean(jobs.length);
      })['catch'](function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'listByType',
    value: function listByType(type) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? 'delayed' : arguments[1];

      return this.rangeByType(type, state);
    }
  }, {
    key: 'listByState',
    value: function listByState() {
      var state = arguments.length <= 0 || arguments[0] === undefined ? 'delayed' : arguments[0];

      return this.rangeByState(type);
    }
  }, {
    key: 'init',
    value: function init(name, data, success, failure) {
      var _this = this;

      /**
       * transforming data into required format
       * because kue is not able to save nested json
       */
      data = Utils.encode(data);
      var jobFunction = function jobFunction() {
        return _this.producer.create(name, data);
      };

      this.delayedJobExists(name).then(function (exists) {
        if (!exists) {
          jobFunction();
        }

        _this.clearQueue(name, 'active');
      }).then(function () {
        _this.consumer.consume(name, function () {
          return jobFunction();
        }, success, failure);
      }).done();
    }
  }]);

  return Manager;
})();

var manager = function manager(options) {
  return new Manager(consumer, producer, options);
};
exports['default'] = manager;
module.exports = exports['default'];