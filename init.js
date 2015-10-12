var kue = require('kue'),
    queue = kue.createQueue();

kue.app.listen(3000);

var init = {
    kue: kue,
    queue: queue
};
module.exports = init;
