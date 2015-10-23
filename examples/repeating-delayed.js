import Aerostat from '../index';

//Bootup, start web interface
Aerostat.init().start();

//Specify configs
Aerostat.config.baseUrl = 'http://www.mocky.io/v2';
Aerostat.config.delay = 1000;

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
