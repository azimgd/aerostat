import producer from './lib/producer/producer';
import consumer from './lib/consumer/consumer';
import config from './lib/config';
import init from './lib/init';
init().start();

const data = {
  url: 'http://example.com/',
  method: 'post',
  payload: {
    name: 'name',
    surname: 'surname',
    msg: 'message'
  }
};

producer('heyyy', data).create();

let jobConsumer = consumer('heyyy');
jobConsumer.onValidate((res) => console.log(res, 'validate'))
jobConsumer.onSuccess((res) => console.log(res, 'success'))
jobConsumer.onFail((res) => console.log(res, 'fail'))
jobConsumer.consume(jobConsumer.callback)
