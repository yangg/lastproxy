
var config = require('./config');
var fs = require('fs');
var path = require('path');

var match = require('./lib/match');

module.exports = {
  shouldUseLocalResponse: function (req, reqBody) {
    if(config.localResponse) {
      let localResponse = config.localResponse;
      let capturedPath;
      for(let pattern in localResponse) {
        if(req.url === pattern) {
          // exact url
          console.log('localResponse: ', pattern);
          req.localResponse = localResponse[pattern];
          return true;
        } else if(match.isGlob(pattern) && (capturedPath = match.matchPath(pattern, req.url))) {
          // localResponse for specifed pattern
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
