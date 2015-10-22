const axios = require('axios');
let flatten = require('flat');
let unflatten = flatten.unflatten;

/**
 *
 */
const encode = (data) => {
  return flatten(data);
}

/**
 *
 */
const decode = (data) => {
  return unflatten(data);
}

const Utils = () => {
  return {
    encode: encode,
    decode: decode
  }
}

export default Utils;
