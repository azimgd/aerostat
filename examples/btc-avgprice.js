/**
 * Following code snippet will calculate avg bitcoin price using coinbase api
 * for last 10 seconds, and exit once it's done.
 */
var Aerostat = require('../index');

//Bootup, start web interface
Aerostat.init().start();

//Specify configs
Aerostat.config.baseUrl = 'https://api.coinbase.com/v2';
Aerostat.config.delay = 2000;

//initialize producer
Aerostat.producer('btc.getPrice', {
  url: '/prices/spot',
  method: 'get',
  params: {
    currency: 'usd'
  }
}).create();

//initialize consumer
var jobConsumer = Aerostat.consumer('btc.getPrice');
var prices = [];

var avgCalc = function(prices) {
  var total = prices.reduce(function (p, c) { return p+c; });
  return total / prices.length;
};

jobConsumer.onSuccess(function(res) {
  var response = res.response.response.data;
  var price = parseFloat(response.data.amount);

  console.log('fetched, current price for 1 btc is', price);
  prices.push(price);

  if(prices.length === 5) {
    console.log(avgCalc(prices));
    process.exit();
  }
});

jobConsumer.consume(jobConsumer.callback);
