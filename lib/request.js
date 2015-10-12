'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var axios = require('axios');
var config = require('../config');

var Request = (function () {
  function Request(options) {
    _classCallCheck(this, Request);

    console.log(options);
    this.root_url = options.root_url || false;
  }

  _createClass(Request, [{
    key: 'send',
    value: function send(url, method, data) {
      url = this.root_url + url;
      var params = {
        method: method,
        url: url,
        data: data
      };

      return axios(params);
    }
  }]);

  return Request;
})();

exports['default'] = function (options) {
  return new Request(options);
};

module.exports = exports['default'];