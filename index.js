#!/usr/bin/env node

const proxy = require('anyproxy')
const config = require('./config')
const startWeinreServer = require('./weinre')

function startServer () {
  let host = require('ip').address()
  if (config.silent) {
    console.log(`Http proxy started at ${host}:${config.port}`)
    console.log(`Proxy interface started at localhost:${config.webPort}`)
  }

  config.weinre && startWeinreServer()

  new proxy.proxyServer(Object.assign({ }, config, { rule: require('./rule') }))
}

// create cert when you want to use https features
// please manually trust this rootCA when it is the first time you run it
if (proxy.isRootCAFileExists()) {
  startServer()
} else {
  proxy.generateRootCA(startServer)
}

config.silent && process.on('uncaughtException', function (err) {
  console.log(err)
})

