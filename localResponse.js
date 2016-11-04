
var config = require('./config');
var fs = require('fs');

var match = require('./lib/match');

module.exports = {
  shouldUseLocalResponse: function (req, reqBody) {
    if(config.localResponse) {
      let localResponse = match.matchUrl(req.url, config.localResponse, 'localResponse %s => %s', true);
      if(localResponse !== false) {
        req.localResponse = localResponse;
        return true;
      }
    }
    return false;
  },

  dealLocalResponse: function (req, reqBody, callback) {
    let filePath = req.localResponse;
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
