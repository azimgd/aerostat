let axios = require('axios');
let config = require('../config');
let flatten = require('flat');
let unflatten = flatten.unflatten;

class Utils {
  constructor() {
  }

  encode(data) {
    return flatten(data);
  }

  decode(data) {
    return unflatten(data);
  }
}

export default () => new Utils();
