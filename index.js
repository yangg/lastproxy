#!/usr/bin/env node

var proxy = require("anyproxy");
var config = require('./config');

function startServer() {
  new proxy.proxyServer(Object.assign({ }, config, { rule: require("./rule") }));
}

//create cert when you want to use https features
//please manually trust this rootCA when it is the first time you run it
if(proxy.isRootCAFileExists()) {
  startServer();
} else {
  proxy.generateRootCA(startServer);
}


