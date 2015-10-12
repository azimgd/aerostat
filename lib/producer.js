'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var init = require('../init');

var Producer = (function () {
  function Producer() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Producer);

    this.delay = options.delay || 5000;
    this.priority = 'high';
  }

  _createClass(Producer, [{
    key: 'create',
    value: function create(name, data) {
      var job = init.queue.create(name, data);

      if (this.delay) {
        job.delay(this.delay);
      }

      if (this.priority) {
        job.priority(this.priority);
      }

      job.save();
    }
  }]);

  return Producer;
})();

var producer = function producer(options) {
  return new Producer(options);
};
exports['default'] = producer;
module.exports = exports['default'];