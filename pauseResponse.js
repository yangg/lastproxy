
var config = require('./config');

var match = require('./lib/match');

module.exports = {
  pauseBeforeSendingResponse: function (req, res) {
    if (config.pauseResponse) {
      let delay = match.matchUrl(req.url, config.pauseResponse, 'pauseResponse %s for %mss');
      if(delay !== false) {
        return delay*1000;
      }
    }
  }
};
