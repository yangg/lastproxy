
var yaml = require('js-yaml');
var fs = require('fs');
var localConfig = yaml.safeLoad(fs.readFileSync(__dirname + '/config.yml', 'utf8'));
var defaultConfig = {
  webPort: 8002,
  weinrePort: 8006,
  port: 8888 // same as fiddler
};

var config = Object.assign(defaultConfig, localConfig);
module.exports = config;
