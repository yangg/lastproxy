
const config = require('../config');
const fs = require('fs');

const match = require('./match');

module.exports = {
  shouldUseLocalResponse: function (req, reqBody) {
    // normalize req.url for https request
    if(req.url[0] == '/') {
      req.url = `https://${req.headers.host}${req.url}`;
    }

    if(config.urlReplace) {
      let urlReplace = match.matchUrl(req.url, config.urlReplace, 'urlReplace %s => %s', true);
      if(urlReplace !== false) {
        if(urlReplace[0] === '/') {
          // complete path with requested protocol & host
          urlReplace = req.url.match(/^https?:\/\/[^\/]*\//)[0] + urlReplace;
        }
        req.urlReplace =  urlReplace;
        return true;
      }
    }

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
    if(req.urlReplace) {
      callback(302, { Location: req.urlReplace }, '');
      return;
    }
    let filePath = req.localResponse;
    console.log('dealLocalResponse: ', filePath);
    fs.readFile(filePath,  (err, data) => {
      if (!err) {
        callback(200, {}, data);
      } else {
        console.log(err);
        callback(err.errno === -2 ? 404 : 500, { }, err.toString());
      }
    });
  }
};
