"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var u = _interopRequireWildcard(require("../util"));

var _parser = _interopRequireDefault(require("../parser"));

var _es6Promise = require("es6-promise");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(folderPath) {
  return function () {
    return new _es6Promise.Promise(function (res, rej) {
      var q = u.fileNameToObjectQueue(res);

      _fs.default.readdir(folderPath, function (err, files) {
        if (err) {
          return rej(err);
        }

        files.filter(function (f) {
          // only take svg
          return /\.svg/.test(f);
        }).forEach(function (f) {
          q.push({
            file: folderPath + "/" + f
          });
        });
      });
    }).then(_parser.default);
  };
}

;
