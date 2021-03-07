"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var u = _interopRequireWildcard(require("../util"));

var _parser = _interopRequireDefault(require("../parser"));

var _es6Promise = require("es6-promise");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(file) {
  return function () {
    return new _es6Promise.Promise(function (res, rej) {
      _fs.default.readFile(file, function (err, data) {
        if (err) {
          return rej(err);
        } // data


        var q = _cheerio.default.load(data.toString("utf8"), {
          xmlMode: true
        });

        var symbols = q("symbol");

        if (symbols.length == 0) {
          return res([]);
        }

        var eles = [];
        symbols.each(function (index, ele) {
          var t = q(this);
          eles.push({
            id: t.attr("id"),
            viewBox: t.attr("viewBox"),
            content: t.html()
          });
        });
        res(eles);
      });
    });
  };
}

;
