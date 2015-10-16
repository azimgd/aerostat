import Aerostat from '../index';
let aerostat = Aerostat();

aerostat.setConfig({ isRepeating: true, delay: 3400 });

aerostat.init('will-pass', {
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

aerostat.init('will-fail', {
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
