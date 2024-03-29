"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiSelectType = exports.mapUserList = exports.mapOtherList = exports.getWeId = exports.getUserId = exports.getTreeItem = exports.getRoleId = exports.getKeyId = exports.decodeMenukey = exports.deSelectType = exports.deSelect = exports.addFullAttr = void 0;
exports.resetChecked = resetChecked;
exports.setChecked = setChecked;
exports.setLabel = setLabel;
exports.transferToMenu = exports.setUserReciving = exports.setOtherReciving = void 0;
var _react = _interopRequireDefault(require("react"));
var _tinper = require("./components/tinper");
var langs = _interopRequireWildcard(require("./lang"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SubMenu = _tinper.Menu.SubMenu;
var i18n = _objectSpread({}, langs);

// 重置_checked属性为false && 为表格添加key
function resetChecked(list, type) {
  if (!Array.isArray(list)) {
    throw new Error('the parameter must be `Array`');
  }
  var res = _toConsumableArray(list);
  for (var i = 0; i < res.length; i++) {
    res[i].key = res[i][type];
    res[i]._checked = false;
  }
  return res;
}

// 设置_checked属性为true
function setChecked(source, ref, type) {
  var res = [],
    tempRes = _toConsumableArray(source);
  for (var i = 0; i < tempRes.length; i++) {
    for (var j = 0; j < ref.length; j++) {
      if (tempRes[i][type] === ref[j][type]) {
        tempRes[i]._checked = true;
      }
    }
  }
  res = _toConsumableArray(tempRes);
  return res;
}
// 非正式环境数据不全,补全用户列表为空的问题
var addFullAttr = exports.addFullAttr = function addFullAttr() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var local = arguments.length > 1 ? arguments[1] : undefined;
  // console.log(i18n[local])
  var res = data.map(function (t, i) {
    return {
      key: t.key ? t.key : "userid-".concat(i),
      _checked: t._checked,
      userid: t.userid ? t.userid : "userid-".concat(i),
      username: t.username ? t.username : i18n[local].unknName,
      email: t.email ? t.email : i18n[local].unknEmail,
      mobile: t.mobile ? t.mobile : i18n[local].unknNo,
      orgName: t.orgName ? t.orgName : i18n[local].unknPart
      // username: t.username ? t.username : '未知姓名',
      // email: t.email ? t.email : '未知邮箱',
      // mobile: t.mobile ? t.mobile : '未知号码',
      // orgName: t.orgName ? t.orgName : '未知部门',
    };
  });

  return res;
};

// 为传进来的数据设置key和reciving,可以在右侧展示
var setUserReciving = exports.setUserReciving = function setUserReciving(source) {
  var res = source.map(function (t) {
    return Object.assign({}, t, {
      key: t.userid,
      reciving: t.orgName ? "".concat(t.username, "(").concat(t.orgName, ")") : t.username
    });
  });
  return res;
};
var setOtherReciving = exports.setOtherReciving = function setOtherReciving(source) {
  var res = source.map(function (t) {
    switch (t.typeCode) {
      case 1:
        return Object.assign({}, t, {
          reciving: t.roleName,
          key: t.roleId
        });
      case 2:
        return Object.assign({}, t, {
          reciving: t.orgName,
          key: t.orgId
        });
      case 3:
        return Object.assign({}, t, {
          reciving: t.ruleName,
          key: "".concat(t.ruleCode, "&").concat(t.ruleName)
        });
      default:
        return t;
    }
  });
  return res;
};

// 根据activeKey设置不同的标签
function setLabel(key, local) {
  switch (key) {
    case '1':
      return i18n[local].user;
    case '2':
      return i18n[local].role;
    case '3':
      return i18n[local].org;
    case '4':
      return i18n[local].rule;
    case '0':
      return i18n[local].wechat;
  }
}
var multiSelectType = exports.multiSelectType = {
  type: 'checkbox'
};
var transferToMenu = exports.transferToMenu = function transferToMenu(treeData) {
  var subMenu = [],
    arr = [];
  if (!(treeData instanceof Array)) {
    arr.push(treeData);
    treeData = arr.concat();
  }
  treeData.forEach(function (value, key) {
    var k = "id=".concat(value.id, "&name=").concat(value.name);
    var v = value.name;
    if ('attrs' in value) {
      subMenu.push( /*#__PURE__*/_react["default"].createElement(SubMenu, {
        key: k,
        title: /*#__PURE__*/_react["default"].createElement("span", null, v)
      }, value.attrs ? transferToMenu(value.attrs) : null));
    } else {
      // 生成叶子节点时将所有对象的key处理成`key=value`这种形式
      var _k = '';
      for (var i in value) {
        _k += "".concat(i, "=").concat(value[i], "&");
      }
      // 处理掉最后一个&
      _k = _k.substring(0, _k.lastIndexOf('&'));
      subMenu.push( /*#__PURE__*/_react["default"].createElement(_tinper.Menu.Item, {
        key: _k
      }, v));
    }
  });
  return subMenu;
};
var mapUserList = exports.mapUserList = function mapUserList() {
  var userList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = [];
  res = userList.map(function (t) {
    return _objectSpread(_objectSpread({}, t), {}, {
      type: t.type,
      typeCode: t.typeCode,
      userid: t.userid,
      username: t.username,
      mobile: t.mobile,
      email: t.email,
      orgName: t.orgName
    });
  });
  return res;
};
var mapOtherList = exports.mapOtherList = function mapOtherList() {
  var otherList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = [];
  res = otherList.map(function (t) {
    switch (t.typeCode) {
      case 1:
        return _objectSpread(_objectSpread({}, t), {}, {
          type: t.type,
          typeCode: t.typeCode,
          roleId: t.roleId,
          roleName: t.roleName,
          roleCode: t.roleCode
        });
      case 2:
        return _objectSpread(_objectSpread({}, t), {}, {
          type: t.type,
          typeCode: t.typeCode,
          orgId: t.orgId,
          orgName: t.orgName
        });
      case 3:
        return _objectSpread(_objectSpread({}, t), {}, {
          type: t.type,
          typeCode: t.typeCode,
          ruleCode: t.ruleCode,
          ruleName: t.ruleName,
          uri: t.uri
        });
      default:
        return t;
    }
  });
  return res;
};

/**
 * @description 选人逻辑统一处理,当前类型的人先清除，统一添加
 * @param data 数据源
 * @param typeCode 清除类型
 */
var deSelect = exports.deSelect = function deSelect() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var typeCode = arguments.length > 1 ? arguments[1] : undefined;
  var res = [];
  res = data.filter(function (t) {
    if (t.typeCode !== typeCode) {
      return t;
    }
  });
  return res;
};
var deSelectType = exports.deSelectType = function deSelectType() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var type = arguments.length > 1 ? arguments[1] : undefined;
  var res = [];
  res = data.filter(function (t) {
    if (t.type !== type) {
      return t;
    }
  });
  return res;
};
var getUserId = exports.getUserId = function getUserId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.userid;
  });
  return res;
};
var getRoleId = exports.getRoleId = function getRoleId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.roleId;
  });
  return res;
};
var getWeId = exports.getWeId = function getWeId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.wxOpenId;
  });
  return res;
};
var getKeyId = exports.getKeyId = function getKeyId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var res = data.map(function (t) {
    return t.key;
  });
  return res;
};
var getTreeItem = exports.getTreeItem = function getTreeItem(data) {
  var arr = [];
  data.forEach(function (item) {});
  return;
};

// 为了支持用户自定义传入规则数据时返回用户自定义的key
// 将key的格式定义为url param的格式
// id=1&name=2的形式
// 对key进行解析，返回
// { id: 1, name: 2 }
var decodeMenukey = exports.decodeMenukey = function decodeMenukey() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var paramList = value.split('&'),
    tempArr,
    res = {};
  paramList.forEach(function (t) {
    tempArr = t.split('=');
    res[tempArr[0]] = tempArr[1];
  });
  return res;
};