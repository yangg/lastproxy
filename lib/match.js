

function isGlob(url) {
  return url.indexOf('*') > -1;
}
var cachedRegex = { };
function pathRegex(pattern) {
  if(pattern in cachedRegex) {
    return cachedRegex[pattern];
  }
  var regStr = regexEscape(pattern);
  var starIndex = regStr.indexOf('*');
  var regPrefix = regStr.substr(0, starIndex);
  var regSuffix = regStr.substr(starIndex);
  regSuffix = regSuffix.replace(/\*\*?/g, function($) {
    return {
      '*': '[^/]*?',
      '**': '.*'
    }[$]
  });
  regSuffix = '(' + regSuffix + ')$';

  var reg = new RegExp(regPrefix + regSuffix);
  cachedRegex[pattern] = reg;
  return reg;
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&');
}

function matchPath(pattern, url) {

  // strip url parameters, not '??'
  url = url.replace(/\?((?!\?).)*/, '');
  var reg = pathRegex(pattern);
  // console.log("'%s'.match(%s) %s", url, reg, (url.match(reg) || [0, false])[1]);
  return (url.match(reg) || [0, false])[1]
}

module.exports = {
  isGlob,
  matchPath
};
