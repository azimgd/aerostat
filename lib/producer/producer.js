'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _init = require('../init');

var _init2 = _interopRequireDefault(_init);

var _utilsUtils = require('../utils/utils');

var _utilsUtils2 = _interopRequireDefault(_utilsUtils);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var Creator = function Creator(state) {
  return {
    /**
     * Creates and saves a new job into kue
     */
    create: function create(priorityConfig) {
      var job = (0, _init2['default'])().queue().create(state.name, state.data);

      if (priorityConfig.removeOnComplete || _config2['default'].removeOnComplete) {
        var removeOnComplete = priorityConfig.removeOnComplete || _config2['default'].removeOnComplete;
        job = job.removeOnComplete(removeOnComplete);
      }

      if (priorityConfig.delay || _config2['default'].delay) {
        var delay = priorityConfig.delay || _config2['default'].delay;
        job = job.delay(delay);
      }

      if (priorityConfig.ttl || _config2['default'].ttl) {
        var ttl = priorityConfig.ttl || _config2['default'].ttl;
        job = job.ttl(ttl);
      }

      if (priorityConfig.priority || _config2['default'].priority) {
        var priority = priorityConfig.priority || _config2['default'].priority;
        job = job.priority(priority);
      }

      job.save();
    }
  };
};

var Producer = function Producer(name, data) {
  data = (0, _utilsUtils2['default'])().encode(data);
  var state = {
    name: name,
    data: data
  };

  return Object.assign({}, Creator(state));
};

exports['default'] = Producer;
module.exports = exports['default'];