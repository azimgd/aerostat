'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var axios = require('axios');
var flatten = require('flat');
var unflatten = flatten.unflatten;

/**
 * Flattens the object,
 * it'll return an object one level deep, regardless of how nested the original object was
 */
var encode = function encode(data) {
  return flatten(data);
};

/**
 * Reverse flatten
 */
var decode = function decode(data) {
  return unflatten(data);
};

/**
 * Returns current timestamp in seconds
 */
var timestamp = function timestamp() {
  return Math.floor(Date.now() / 1000);
};

var Utils = function Utils() {
  return {
    encode: encode,
    decode: decode,
    timestamp: timestamp
  };
};

exports['default'] = Utils;
module.exports = exports['default'];