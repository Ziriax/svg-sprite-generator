"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idFromFileName = exports.fileNameToObjectQueue = exports.fileNameToObject = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _async = _interopRequireDefault(require("async"));

var _es6Promise = require("es6-promise");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Slugify function taken from https://gist.github.com/mathewbyrne/1280286
 */
var idFromFileName = function idFromFileName(fileName) {
  return fileName.toString().toLowerCase().replace(/\.svg/g, '').replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
};

exports.idFromFileName = idFromFileName;

var fileNameToObject = function fileNameToObject(filePath) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new _es6Promise.Promise(function (res, rej) {
    _fs.default.readFile(filePath, function (err, data) {
      if (err) {
        return rej(err);
      }

      var idStr = id ? id : function (parts) {
        return idFromFileName(parts[parts.length - 1]);
      }(filePath.split("/"));
      return res({
        content: data.toString("utf8"),
        id: idStr
      });
    });
  });
};

exports.fileNameToObject = fileNameToObject;

var fileToObjectQueue = function fileToObjectQueue(drain) {
  var results = [];

  var q = _async.default.queue(function (task, callback) {
    if (_fs.default.existsSync(task.file)) {
      fileNameToObject(task.file, task.id).then(function (o) {
        results.push(o);
        callback();
      });
    } else {
      // file not existing,
      // just skip
      callback();
    }
  });

  q.drain = function () {
    drain(results);
  };

  return q;
};

exports.fileNameToObjectQueue = fileToObjectQueue;
