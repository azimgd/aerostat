let manager = require('../index')({
  repeating: true,
  delay: 5000
});

manager.init('jobname', {
  url: '/55febabac604810e14c098fa',
  method: 'post',
  payload: {
    name: 'name',
    surname: 'surname',
    msg: 'message'
  }
}, (data) => {
  console.log(data);
}, (err) => {
  console.log('failed request');
});
