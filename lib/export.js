'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _producerProducer = require('./producer/producer');

var _producerProducer2 = _interopRequireDefault(_producerProducer);

var _consumerConsumer = require('./consumer/consumer');

var _consumerConsumer2 = _interopRequireDefault(_consumerConsumer);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var dependencies = { init: _init2['default'], producer: _producerProducer2['default'], consumer: _consumerConsumer2['default'], config: _config2['default'] };

exports['default'] = dependencies;
module.exports = exports['default'];