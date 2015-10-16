class Config {
  constructor() {
    this._isRepeating = false;
    this._rootUrl = 'http://example.com';
    this._delay = '1000';
    this._priority = 'normal';
  }

  /**
   * Should same job be executed right after it's done
   */
  get isRepeating() {
    return this._isRepeating;
  }

  set isRepeating(val) {
    this._isRepeating = Boolean(val);
  }

  /**
   * Base url for all api calls
   */
  get rootUrl() {
    return this._rootUrl;
  }

  set rootUrl(val) {
    this._rootUrl = val;
  }

  /**
   * Amount in milliseconds between next task is fired
   */
  get delay() {
    return this._delay;
  }

  set delay(val) {
    this._delay = parseInt(val);
  }

  /**
   * Priority of job
   */
  get priority() {
    return this._priority;
  }

  set priority(val) {
    this._priority = val;
  }
}

export default Config;
