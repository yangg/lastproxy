

function isGlob(url) {
  return url.indexOf('*') > -1;
}
var cachedRegex = { };
function pathRegex(pattern) {
  if(pattern in cachedRegex) {
    return cachedRegex[pattern];
  }
  let regStr = regexEscape(pattern);
  let starIndex = regStr.indexOf('*');
  let regPrefix = regStr.substr(0, starIndex);
  let regSuffix = regStr.substr(starIndex);
  regSuffix = regSuffix.replace(/\*\*?/g, function($) {
    return {
      '*': '[^/]*?',
      '**': '.*'
    }[$]
  });
  regSuffix = '(' + regSuffix + ')$';

  let reg = new RegExp(regPrefix + regSuffix);
  cachedRegex[pattern] = reg;
  return reg;
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
}

function matchPath(pattern, url) {

  // strip url parameters, not '??'
  url = url.replace(/\?((?!\?).)*/, '');
  let reg = pathRegex(pattern);
  // console.log("'%s'.match(%s) %s", url, reg, (url.match(reg) || [0, false])[1]);
  return (url.match(reg) || [0, false])[1]
}

function matchUrl(reqUrl, options, mask) {
  let matchedOption = false;
  for (let pattern in options) {
    let option = options[pattern];
    if (reqUrl === pattern) {
      // match exact url
      matchedOption = option;
      console.log(mask, option, reqUrl);
      break;
    } else if (isGlob(pattern) && matchPath(pattern, reqUrl) !== false) {
      // matched specifed pattern
      matchedOption = option;
      console.log(mask + ' matched %s', option, reqUrl, pattern);
      break;
    }
  }
  return matchedOption;
}

module.exports = {
  isGlob,
  matchPath,
  matchUrl
};
