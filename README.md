# aerostat

Aerostat is a Pub/Sub MQ integrated with message delivery service built for node.js. Package for creating, scheduling and segmenting push notifications.

![Aerostat architecture](http://i.imgur.com/1RRgHzV.png)

## Quickstart
Aerostat requires Redis >= 2.6.12

### Install
`npm install aerostat`

### Example

This code snippet will create a subscription with producer, and consumer will deliver payload message each 2 minutes to specified endpoint. You can find more detailed version of this example [here](https://github.com/azimgd/aerostat/blob/master/examples/repeating-delayed.js)
```
var Aerostat = require('aerostat');

//Bootup, start web interface
Aerostat.init().start();

//Specify configs
Aerostat.config.baseUrl = 'http://www.mocky.io/v2';
Aerostat.config.delay = 2 * 60000;

//initialize producer
var data = {
  url: '/5185415ba171ea3a00704eed',
  params: {},
  payload: {
    msg: 'message',
    new: 'another'
  }
};
Aerostat.producer('message-name', data).create();

//initialize consumer
var jobConsumer = Aerostat.consumer('message-name');
jobConsumer.onSuccess(function(res) { console.log(res.response.response.data, 'success'); });
jobConsumer.onFail(function(res) { console.log(res.response.response.data, 'failed'); });
jobConsumer.consume(jobConsumer.callback);
```

## Api

#### Aerostat
Create new instance

#### .config
JSON with configuration

#### .init()
Entery point for queue, applies configs activates web ui

  * **.start()** - Bootup, start web interface
  * **.queue()** - Returs kue instance

#### .producer(name, payload)
MQ producer

  * **.create()** - Initializes and saves job into queue with specified name and payload data

#### .consumer(name)
MQ consumer

  * **.consume(callback)** - Executes callback when job with specified name popped from the queue
  * **.callback(job, done)** - Will send payload received from message to specified endpoint, parse resonse using .onValidate, then call .onSuccess or .onFail respectively
  * **.onSuccess()** - Function to trigger on successful request
  * **.onFail()** - Function to trigger on failed request
  * **.onValidate()** - Parse received response

## Config api

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
