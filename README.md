# LastProxy
A wrapper provide yaml config for [anyproxy](https://github.com/alibaba/anyproxy)
> A fully configurable proxy in NodeJS, which can handle HTTPS requests perfectly.

## Features
See all [configable options](config.yml.sample)
### urlReplace - redirect url to another path
### proxy - config reverse proxy for specified host or path

### localResponse

### interceptHttps for sepecied host

### cache
### userAgent
### allowOrigin

## Usage
```bash
npm install
copy config.yml.sample config.yml

# You must have pm2 globally installed
# With pm2 your proxy will restart automatically after script or config files changed
npm start
# or start via nodemon
nodemon  --ext "js,yml" index.js
# or
node index.js
```
