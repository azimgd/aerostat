'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _init = require('../init');

var _init2 = _interopRequireDefault(_init);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var Manager = function Manager(state) {
  return {
    /**
     * Returns array of maximum n jobs which have specified type and state
     */
    rangeByType: function rangeByType(type) {
      var state = arguments.length <= 1 || arguments[1] === undefined ? 'delayed' : arguments[1];
      var range = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];

      return _q2['default'].ninvoke(_kue2['default'].Job, 'rangeByType', type, state, 0, range, 'asc');
    },

    /**
     * Returns array of maximum n jobs which have specified state
     */
    rangeByState: function rangeByState() {
      var state = arguments.length <= 0 || arguments[0] === undefined ? 'delayed' : arguments[0];
      var range = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];

      return _q2['default'].ninvoke(_kue2['default'].Job, 'rangeByState', state, 0, range, 'asc');
    },

    /**
     * Removes each array of jobs from kue
     */
    removeJobs: function removeJobs(jobs) {
      jobs.forEach(function (job) {
        return job.remove();
      });
    }
  };
};

var Queue = function Queue() {
  var state = {};

  return Object.assign({}, Manager(state));
};

exports['default'] = Queue;
module.exports = exports['default'];