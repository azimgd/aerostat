'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _queueQueue = require('./queue/queue');

var _queueQueue2 = _interopRequireDefault(_queueQueue);

var Init = function Init() {
  /**
   * Returns a singleton instance Kue Queue instance
   */
  var craeteKueQueue = function craeteKueQueue() {
    return _kue2['default'].createQueue();
  };

  /**
   * Initializing function
   */
  var start = function start() {
    if (_config2['default'].kue.port) {
      _kue2['default'].app.listen(_config2['default'].kue.port);
    }

    if (_config2['default'].removeDelayedJobs) {
      (0, _queueQueue2['default'])().rangeByState('delayed').then((0, _queueQueue2['default'])().removeJobs);
    }

    if (_config2['default'].removeActiveJobs) {
      (0, _queueQueue2['default'])().rangeByState('active').then((0, _queueQueue2['default'])().removeJobs);
    }
  };

  return {
    start: start,
    queue: craeteKueQueue
  };
};

exports['default'] = Init;
module.exports = exports['default'];