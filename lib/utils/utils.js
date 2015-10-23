const axios = require('axios');
let flatten = require('flat');
let unflatten = flatten.unflatten;

/**
 * Flattens the object,
 * it'll return an object one level deep, regardless of how nested the original object was
 */
const encode = (data) => {
  return flatten(data);
};

/**
 * Reverse flatten
 */
const decode = (data) => {
  return unflatten(data);
};

/**
 * Returns current timestamp in seconds
 */
const timestamp = () => {
  return Math.floor(Date.now() / 1000);
};

const Utils = () => {
  return {
    encode,
    decode,
    timestamp,
  };
};

export default Utils;
