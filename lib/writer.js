"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToConsole = exports.writeToFile = exports.getSpriteXml = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _es6Promise = require("es6-promise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var writeToFile = function writeToFile(destPath, content) {
  return new _es6Promise.Promise(function (res, rej) {
    _fs.default.writeFile(destPath, content, function (err) {
      if (err) {
        rej(err);
      } else {
        res(destPath);
      }
    });
  });
};

var getSpriteXml = function getSpriteXml(svgs) {
  return '<?xml version="1.0" encoding="utf-8"?>' + "\n" + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + "\n" + svgs.map(function (s) {
    return '<symbol' + (s.id ? ' id="' + s.id + '"' : '') + (s.viewBox ? ' viewBox="' + s.viewBox + '"' : '') + '>' + s.content + "\n" + '</symbol>';
  }).join("\n") + '</svg>';
};

exports.getSpriteXml = getSpriteXml;

var publicWriteToFile = function publicWriteToFile(filePath, svgs) {
  return writeToFile(filePath, getSpriteXml(svgs));
};

exports.writeToFile = publicWriteToFile;

var publicWriteToConsole = function publicWriteToConsole(svgs) {
  return new _es6Promise.Promise(function () {
    console.log(getSpriteXml(svgs));
  });
};

exports.writeToConsole = publicWriteToConsole;
