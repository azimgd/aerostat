var kue = require('kue'),
    queue = kue.createQueue();

kue.app.listen(3000);

let init = {
    kue: kue,
    queue: queue
};
export default init;
