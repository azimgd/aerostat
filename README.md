# aerostat

Pubsub MQ integrated with message delivery, for creating scheduled push notifications.

![Aerostat architecture](http://i.imgur.com/1RRgHzV.png)

## Exampes
This code exampe will publish a subscription, and consumer will deliver payload message each 2 minutes to provided url. 
```
let aerostat = require('./lib/manager')();

aerostat.init('jobname', {
  url: '/v2/analytics/update',
  method: 'post',
  payload: {
    user: 'username',
    timestamp: '1182882221',
    msg: 'message'
  }
}, (response) => {
  console.log(response);
}, (err) => {
  console.log('failed request');
});
```
