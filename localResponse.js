
var config = require('./config');
var fs = require('fs');
var path = require('path');


function isGlob(url) {
  return url.indexOf('*') > -1;
}
var cachedRegex = { };
function pathRegex(pattern) {
  if(pattern in cachedRegex) {
    return cachedRegex[pattern];
  }
  var regStr = regexEscape(pattern);
  var starIndex = regStr.indexOf('*');
  var regPrefix = regStr.substr(0, starIndex);
  var regSuffix = regStr.substr(starIndex);
  regSuffix = regSuffix.replace(/\*\*?/g, function($) {
    return {
      '*': '[^/]*?',
      '**': '.*'
    }[$]
  });
  regSuffix = '(' + regSuffix + ')$';

  var reg = new RegExp(regPrefix + regSuffix);
  cachedRegex[pattern] = reg;
  return reg;
}
function matchPath(pattern, url) {

  // strip url parameters, not '??'
  url = url.replace(/\?((?!\?).)*/, '');
  console.log(url);
  var reg = pathRegex(pattern);
  // console.log("'%s'.match(%s) %s", url, reg, (url.match(reg) || [0, false])[1]);
  return (url.match(reg) || [0, false])[1]
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
}
module.exports = {
  shouldUseLocalResponse: function (req, reqBody) {
    if(config.localResponse) {
      let localResponse = config.localResponse;
      let capturedPath;
      for(let pattern in localResponse) {
        if(req.url === pattern) {
          console.log('localResponse: ', pattern);
          req.localResponse = localResponse[pattern];
          return true;
        } else if(isGlob(pattern) && (capturedPath = matchPath(pattern, req.url))) {
          console.log('localResponse: %s, %s', pattern, capturedPath);
          req.localResponse = path.join(localResponse[pattern], capturedPath);
          return true;
        }
      }
    }
    return false;
  },

  dealLocalResponse: function (req, reqBody, callback) {
    var filePath = req.localResponse;
    console.log('dealLocalResponse: ', filePath);
    fs.readFile(filePath,  (err, data) => {
      if (!err) {
        callback(200, {}, data);
      } else {
        console.log(err);
        callback(err.errno === -2 ? 404 : 500, {}, err.toString());
      }
    });
  }
};
