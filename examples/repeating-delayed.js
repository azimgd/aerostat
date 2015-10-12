let manager = require('../index')({
  root_url: 'http://www.mocky.io/v2',
  repeating: true,
  delay: 5000
});

manager.init('will-pass', {
  url: '/55febabac604810e14c098fa',
  method: 'post',
  payload: {
    name: 'name',
    surname: 'surname',
    msg: 'message'
  }
}, (res) => {
  console.log(res.response, res.payload);
}, (res) => {
  console.log(res.err, res.payload);
});

manager.init('will-fail', {
  url: '/undefined-url',
  method: 'post',
  payload: {
    name: 'name',
    surname: 'surname',
    msg: 'message'
  }
}, (res) => {
  console.log(res.response, res.payload);
}, (res) => {
  console.log(res.err, res.payload);
});
