var proxy = require("anyproxy");

//create cert when you want to use https features
//please manually trust this rootCA when it is the first time you run it
// !proxy.isRootCAFileExists() && proxy.generateRootCA();

var options = {
  port: 8888,
  rule: require("./rule"),
  // throttle: 50, // optional, speed limit in kb/s
  interceptHttps: true,
  silent: true
};
new proxy.proxyServer(options);
