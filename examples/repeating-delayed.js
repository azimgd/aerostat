var Aerostat = require('../index');

//Bootup, start web interface
Aerostat.init().start();

//Specify configs
Aerostat.config.baseUrl = 'http://www.mocky.io/v2';
Aerostat.config.delay = 1000;

//initialize producer
var data = {
  url: '/5185415ba171ea3a00704eed',
  method: 'post',
  payload: {
    msg: 'message',
    new: 'another',
  },
};
Aerostat.producer('message-name', data).create();

//initialize consumer
var jobConsumer = Aerostat.consumer('message-name');
jobConsumer.onValidate(function(res) {
  console.log(res.payload, 'validate');
});

jobConsumer.onSuccess(function(res) {
  console.log(res.response.response.data, 'success');
});

jobConsumer.onFail(function(res) {
  console.log(res.response.response.data, 'fail');
});

jobConsumer.consume(jobConsumer.callback);
