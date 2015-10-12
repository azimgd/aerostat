var axios = require('axios');

class Request {
  constructor(options) {
    console.log(options);
    this.root_url = options.root_url || false;
  }

  send(url, method, data) {
    url = this.root_url + url;
    let params = {
      method: method,
      url: url,
      data: data
    };

    return axios(params);
  }
}

export default (options) => new Request(options);
