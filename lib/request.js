var axios = require('axios');
var config = require('../config');

class Request {
  constructor() {
  }

  send(url, method, data) {
    url = config.api.url + url;
    let params = {
      method: method,
      url: url,
      data: data
    };

    return axios(params);
  }
}

export default () => new Request();
