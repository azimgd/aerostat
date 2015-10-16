import axios from 'axios';
import config from './stores/config';

class Request {
  constructor(config) {
    this.config = config;
  }

  /**
   * 
   */
  send(url, method, data) {
    url = (this.config.rootUrl || '') + url;
    let params = {
      method: method,
      url: url,
      data: data
    };

    return axios(params);
  }
}

export default Request;
