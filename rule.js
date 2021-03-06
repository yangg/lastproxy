
var config = require('./config')

var match = require('./lib/match')

module.exports = Object.assign({
  summary: function () {
    return JSON.stringify(config, null, 2)
  },
  replaceRequestOption: function (req, option) {
    if (config.userAgent !== undefined) {
      option.headers['user-agent'] = config.userAgent
    }

    // cache disabled
    if (config.cache === false) {
      delete option.headers['if-modified-since']
      delete option.headers['if-none-match']
    }

    // proxy
    if (config.proxy) {
      let proxyHost = match.matchUrl(req.url, config.proxy, 'proxy %s => %s')
      if (proxyHost !== false) {
        option.hostname = proxyHost
      }
    }
    return option
  },
  replaceResponseHeader (req, res, header) {
    header = header || {}
    if (config.allowOrigin) {
      header['Access-Control-Allow-Origin'] = config.allowOrigin
    }
    return header
  },
  shouldInterceptHttpsReq (req) {
    let interceptHttps = config.interceptHttps
    if (interceptHttps && (typeof interceptHttps === 'object')) {
      let host = req.headers.host
      host = host.replace(/:443$/, '') // trim ending port :443 for SwitchyOmega
      return host in interceptHttps
    }
    return interceptHttps
  }
}, require('./lib/pauseResponse'), require('./lib/localResponse'), require('./lib/replaceResponse'))

