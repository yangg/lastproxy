#!/usr/bin/env node

var proxy = require("anyproxy");
var config = require('./config');

function startServer() {
  let host = require('ip').address();
  if(config.silent) {
    console.log(`Http proxy started at ${host}:${config.port}`);
    console.log(`Proxy interface started at ${host}:${config.webPort}`);
  }
  console.log(`Weinre interface started at ${host}:${config.weinrePort}`);
  new proxy.proxyServer(Object.assign({ }, config, { rule: require("./rule") }));
}

//create cert when you want to use https features
//please manually trust this rootCA when it is the first time you run it
if(proxy.isRootCAFileExists()) {
  startServer();
} else {
  proxy.generateRootCA(startServer);
}


config.silent && process.on('uncaughtException', function (err) {
  console.log(err);
});


