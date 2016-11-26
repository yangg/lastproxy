

const weinre = require('weinre');
const config = require('./config');
function startServer() {
  process.stdout.write(`Weinre interface attached to `);
  const weinreServer = weinre.run({
    httpPort: config.weinrePort,
    boundHost: '-all-',
    verbose: false,
    debug: false,
    readTimeout: 5,
    deathTimeout: 15,
  });
  weinreServer.on('listening', function () {
  });
  weinreServer.on('error', function(err) {
    console.log(err)
  });
}

module.exports = startServer;