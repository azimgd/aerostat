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
    create: function create() {
      var job = (0, _init2['default'])().queue().create(state.name, state.data);

      if (_config2['default'].removeOnComplete) {
        job = job.removeOnComplete(_config2['default'].removeOnComplete);
      }

      if (_config2['default'].delay) {
        job = job.delay(_config2['default'].delay);
      }

      if (_config2['default'].ttl) {
        job = job.ttl(_config2['default'].ttl);
      }

      if (_config2['default'].priority) {
        job = job.priority(_config2['default'].priority);
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