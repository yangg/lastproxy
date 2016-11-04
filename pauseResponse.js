
var config = require('./config');

var match = require('./lib/match');

module.exports = {
  pauseBeforeSendingResponse: function (req, res) {
    if (config.pauseResponse) {
      let delay = match.matchUrl(req.url, config.pauseResponse, 'pauseResponse %sms for %s');
      if(delay !== false) {
        return delay;
      }
    }
  }
};
