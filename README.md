# LastProxy
A wrapper provide yaml config for [anyproxy](https://github.com/alibaba/anyproxy)

## Features
See all [configable options](config.yml.sample)

## Usage
```bash
npm install
copy config.yml.sample config.yml

# You must have pm2 globally installed
# With pm2 your proxy will restart automatically after script or config files changed
npm start
# or start with nodemon
nodemon  --ext "js,yml" index.js
# or
node index.js
```
