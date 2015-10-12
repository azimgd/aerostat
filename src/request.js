var axios = require('axios');

class Request {
  constructor(options) {
    this.root_url = options.root_url || false;
  }

  send(url, method, data) {
    let params = {
      method: method,
      url: url,
      data: data
    };

    return axios(params);
  }
}

export default (options) => new Request(options);
