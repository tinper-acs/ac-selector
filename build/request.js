"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestFetch = requestFetch;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function requestFetch(_ref) {
  var url = _ref.url,
    _ref$option = _ref.option,
    option = _ref$option === void 0 ? {
      method: 'GET'
    } : _ref$option;
  var options = _objectSpread({
    method: option.method,
    // *GET, POST, PUT, DELETE, etc.
    cache: 'default',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include',
    // include, same-origin, *omit
    // headers: {
    //   'content-type': 'application/json',
    //   'withCredentials': true
    // },
    mode: 'cors'
  }, option);
  var data, paramArr2, param;
  if (option.method === 'get') {
    data = option.params || {};
    paramArr2 = {};
    for (var k in data) {
      paramArr2[k] = data[k];
    }
    param = new URLSearchParams(paramArr2).toString();
    if (param.length > 0) {
      if (url.indexOf('?') >= 0) {
        url = url + '&' + param;
      } else {
        url = url + '?' + param;
      }
    }
  }
  // method: "POST", // *GET, POST, PUT, DELETE, etc.
  // mode: "cors", // no-cors, *cors, same-origin
  // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  // credentials: "same-origin", // include, *same-origin, omit
  // headers: {
  //   "Content-Type": "application/json",
  //   // 'Content-Type': 'application/x-www-form-urlencoded',
  // },
  // redirect: "follow", // manual, *follow, error
  // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  // body: JSON.stringify(data),

  return fetch(encodeURI(url), options).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('Get Network Response Was Wrong.');
    }
  }).then(function (data) {
    // console.log(data);
    return data;
  })["catch"](function (error) {
    console.error(error);
    throw error;
  });
}