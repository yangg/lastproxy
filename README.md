# LastProxy
A wrapper provide yaml config for [AnyProxy](https://github.com/alibaba/anyproxy).
> A fully configurable proxy in NodeJS, which can handle HTTPS requests perfectly.

## Features
Easily config the following options (features) for AnyProxy via yml config.
### urlReplace
Redirect url to another path
```yml
urlReplace:
  example.com:
    /help: /current/working/page
    /about: /current/working/page2
```

### localResponse
Map remote file or folder to local
```yml
localResponse:
  # localResponse for url or pattern
  http://example.com/app.js: /local/path/to/debug.js
  example.com/static/**: /local/folder/to/static
```

### proxy
Reverse proxy for url or pattern
```yml
proxy:
  # proxy for url or pattern
  http://example.com/app.js: 127.0.0.1
  example.com/static/**: 127.0.0.1
```

### weinre
Inject weinre script
```yml
weinre:
  # inject weinre to all sites
  # true
  # or specified url
  example.com/**: true
  other.com/test/**: true
```

### pauseResponse
pause response in second
```yml
pauseResponse:
  # pause response in second
  # pauseResponse for url or pattern
  example.com/images/**: 2
```

### interceptHttps
Intercept https for specified host
```yml
interceptHttps:
  # intercept https for all sites
  # true
  # or sepcified host
  www.example.com: true
  example2.com: true
```

### cache
Disable cache by remove `if-modified-since` and `if-none-match` from request header
### userAgent
Customize user-agent
### allowOrigin
Add `Access-Control-Allow-Origin` header to response

### See all [configurable options](config.yml.sample)

## Installation
```bash
npm install -g lastproxy
```

## Usage
```bash
# start lastproxy, you can edit ~/.lastproxy.yml on your own.
lastproxy
```

## Development
```bash
git clone https://github.com/yangg/lastproxy.git
cd lastproxy
npm install
cp config.yml.sample config.yml
# You must have pm2 globally installed
# With pm2 lastproxy will restart automatically after script or config files changed
npm start # alias for `pm2 start index.js --watch --name=last`
# or start via nodemon
# nodemon  --ext "js,yml" index.js
# or
# node index.js
```
