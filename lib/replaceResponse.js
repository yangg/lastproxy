
const host = require('ip').address()
const config = require('../config')
const match = require('./match')

module.exports = {
  replaceServerResDataAsync (req, res, serverResData, callback) {
    // for those non-unicode response , serverResData.toString() should not be your first choice.
    // this issue may help you understanding how to modify an non-unicode response: https://github.com/alibaba/anyproxy/issues/20
    let contentType = res.headers['content-type']
    if (contentType && contentType.indexOf('/html') > -1) {
      if (config.weinre === true ||
        (
          config.weinre &&
          typeof config.weinre === 'object' &&
          match.matchUrl(req.url, config.weinre, 'Append weinre to %s'))
        ) {
        let newDataStr = serverResData.toString()
        let weinreScript = `<script src="http://${host}:${config.weinrePort}/target/target-script-min.js#anonymous"></script>`
        newDataStr = serverResData.toString().replace(/(?=<\/body>)/, weinreScript)
        // newDataStr += "hello world!";
        callback(newDataStr)
        return
      }
    }
    callback(serverResData)
  }
}
