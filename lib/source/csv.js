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

let csvStringToSvgContents = function (str) {
  return function (fileList) {
    return new _es6Promise.Promise(function (res, rej) {
      let q = u.fileNameToObjectQueue(res);
      fileList.forEach(function (item) {
        q.push(item);
      });
    });
  }(str.split("\n").map(function (line) {
    let parts = line.split(',').map(function (item) {
      return item.trim();
    });
    return {
      id: parts[0],
      file: parts[1]
    };
  }).filter(function (item) {
    return !!item.file;
  }));
};
/*
 * Returns a function that
 * takes a CSV file and export as SVG content list
 * @param filePath - path to svg file
 * @return fn - the source function
 */


function _default(filePath) {
  return function () {
    return new _es6Promise.Promise(function (res, rej) {
      _fs.default.readFile(filePath, function (err, data) {
        if (err) {
          return rej(err);
        }

        return csvStringToSvgContents(data.toString('utf8')).then(res);
      });
    }).then(_parser.default);
  };
}

;
