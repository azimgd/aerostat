# aerostat

Aerostat is a Pub/Sub MQ integrated with message delivery service built for node.js. Package for creating, scheduling and segmenting push notifications.

![Aerostat architecture](http://i.imgur.com/1RRgHzV.png)

## Installation

Be sure to run this script with support of ES6 on your node.js environment!

`npm install aerostat`

## Options

```
let options = {
  /**
   * New job will be added to queue after existing is executed,
   * creating infinite loop of delayed repeating jobs
   */
  repeating: false,

  /**
   * Delay between repeating jobs in milliseconds
   */
  delay: 5000
};
```

## Example

This code exampe will publish a subscription, and consumer will deliver payload message each 2 minutes to provided url.
```
let aerostat = require('aerostat');
let options = {};

aerostat(options).init('jobname', {
  url: '/v2/analytics/update',
  method: 'post',
  payload: {
    user: 'username',
    timestamp: '1182882221',
    msg: 'message'
  }
}, (res) => {
  console.log(res.response, res.payload);
}, (res) => {
  console.log(res.err, res.payload);
});
```

## License

The MIT License (MIT)

Copyright (c) 2015 Aerostat &lt;me@azimgd.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
