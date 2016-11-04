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
### pauseResponse
pause response in ms
```yml
pauseResponse:
  # pause response in ms
  # pauseResponse for url or patter
  example.com/images/**: 2000
```

### interceptHttps
Intercept https for specified host
```yml
interceptHttps:
  www.example.com: true
  example2.com: true
```

### cache
Disable cache by remove `if-modified-since` and `if-none-match` from request header
### userAgent
### allowOrigin
Add `Access-Control-Allow-Origin` header to response

### See all [configurable options](config.yml.sample)

## Usage
```bash
npm install
cp config.yml.sample config.yml

# You must have pm2 globally installed
# With pm2 your proxy will restart automatically after script or config files changed
npm start # alias for `pm2 start index.js --watch --name=last`
# or start via nodemon
nodemon  --ext "js,yml" index.js
# or
node index.js
```
