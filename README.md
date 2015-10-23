# aerostat

Aerostat is a Pub/Sub MQ integrated with message delivery service built for node.js. Package for creating, scheduling and segmenting push notifications.

![Aerostat architecture](http://i.imgur.com/1RRgHzV.png)

## Installation

`npm install aerostat`

## Options
```
Aerostat.config.baseUrl = 'http://www.mocky.io/v2';
Aerostat.config.isRepeating = false;
```

## Options Api

```
{
  //Should new job be triggered after previos has finished
  isRepeating: true,

  //Base url to send request with payload for all jobs
  baseUrl: null,

  //Remove job from queue after it's done
  removeOnComplete: false,

  //Delay between current and next job to be triggered
  delay: 10000,

  //Time to live for each job, will be removed after ttl is finished
  ttl: 16000,

  //Priority of job
  priority: 'high',

  //Removes delayed jobs on start
  removeDelayedJobs: true,

  //Removes active jobs on start
  removeActiveJobs: true,

  kue: {
    //Port for Kue web interface, set to false to deactivate
    port: 3000
  }
}
```

## Example

This code exampe will create a producer subscription, and consumer will deliver payload message each 2 minutes to provided url.
```
import Aerostat from '../index';

//Bootup, start web interface
Aerostat.init().start();

//Specify configs
Aerostat.config.baseUrl = 'http://www.mocky.io/v2';
Aerostat.config.delay = 2 * 60000;

//initialize producer
const data = {
  url: '/5185415ba171ea3a00704eed',
  method: 'post',
  payload: {
    msg: 'message',
    new: 'another'
  }
};
Aerostat.producer('message-name', data).create();

//initialize consumer
let jobConsumer = Aerostat.consumer('message-name');
jobConsumer.onValidate((res) => console.log(res.payload, 'validate'));
jobConsumer.onSuccess((res) => console.log(res.response.response.data, 'success'));
jobConsumer.onFail((res) => console.log(res.response.response.data, 'fail'));
jobConsumer.consume(jobConsumer.callback);
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
