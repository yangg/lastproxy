
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let program = path.basename(process.argv[1]);
let configFile = __dirname + '/config.yml';
if(program === 'lastproxy') { // global
  configFile = require('os').homedir() + '/.lastproxy.yml';
}
const localConfig = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
const defaultConfig = {
  webPort: 8002,
  weinrePort: 8006,
  port: 8888 // same as fiddler
};

const config = Object.assign({}, defaultConfig, localConfig);
module.exports = config;
