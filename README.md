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
### proxy
Reverse proxy for specified host or path
```yml
proxy:
  # proxy for domain
  example.com: 127.0.0.1
  # proxy for specified path
  example.com:
    /static: 127.0.0.1
```

### localResponse
Map remote folder or file to local
```yml
localResponse:
  # localResponse exact url
  http://example.com/app.js: /local/path/to/debug.js
  # localResponse specified pattern
  example.com/static/**: /local/folder/to/static
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
