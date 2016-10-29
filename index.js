var proxy = require("anyproxy");
var config = require('./config');

//create cert when you want to use https features
//please manually trust this rootCA when it is the first time you run it
// !proxy.isRootCAFileExists() && proxy.generateRootCA();

var options = {
  port: config.port,
  rule: require("./rule"),
  // throttle: 50, // optional, speed limit in kb/s
  interceptHttps: true,
  silent: true
};

process.on('uncaughtException', function (err) {
  console.log(err);
});
new proxy.proxyServer(options);
