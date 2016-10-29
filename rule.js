
var config = require('./config');

module.exports = Object.assign({
  summary: function () {
    return JSON.stringify(config, null, 2);
  },
  replaceRequestOption: function (req, option) {

    if(config.userAgent !== undefined) {
      option.headers['user-agent'] = config.userAgent;
    }

    // cache disabled
    if (config.cache === false) {
      delete option.headers['if-modified-since'];
      delete option.headers['if-none-match'];
    }

    // https://nodejs.org/api/http.html#http_http_request_options_callback
    // urlReplace
    if(config.urlReplace) {
      let urlReplace = config.urlReplace[option.hostname];
      if (urlReplace && (option.path in urlReplace)) {
        option.path = urlReplace[option.path];
      }
    }

    // proxy
    if(config.proxy) {
      let proxy = config.proxy[option.hostname];
      if(typeof proxy == 'string') {
        // proxy for domain
        option.hostname = proxy;
      } else {
        // proxy for specified path
        for(let path in proxy) {
          if(option.path.indexOf(path) === 0) {
            option.hostname = proxy[path];
          }
        }
      }
    }
    return option;
  },
  replaceResponseHeader(req, res, header) {
    header = header || {};
    if(config.allowOrigin) {
      header['Access-Control-Allow-Origin'] = config.allowOrigin;
    }
    return header;
  },
  
}, require('./localResponse'));

