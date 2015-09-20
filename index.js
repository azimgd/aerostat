let manager = require('./lib/manager')();

manager.init('azim.setLike', {
  url: '/55febabac604810e14c098fa',
  method: 'post',
  payload: {
    username: 'username',
    password: 'password',
    mediaId: '10010233'
  }
});
