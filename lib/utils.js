'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var axios = require('axios');
var config = require('../config');
var flatten = require('flat');
var unflatten = flatten.unflatten;

var Utils = (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: 'encode',
    value: function encode(data) {
      return flatten(data);
    }
  }, {
    key: 'decode',
    value: function decode(data) {
      return unflatten(data);
    }
  }]);

  return Utils;
})();

exports['default'] = function () {
  return new Utils();
};

module.exports = exports['default'];