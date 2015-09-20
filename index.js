let manager = require('./lib/manager')();
manager.init('azims', {
  url: '/setlike',
  method: 'post',
  data: {
    username: 'username',
    password: 'password',
    mediaId: '10010233'
  }
});
