var proxy = require("anyproxy");
var config = require('./config');

//create cert when you want to use https features
//please manually trust this rootCA when it is the first time you run it
// !proxy.isRootCAFileExists() && proxy.generateRootCA();

process.on('uncaughtException', function (err) {
  console.log(err);
});
new proxy.proxyServer(Object.assign({ }, config, { rule: require("./rule") }));
