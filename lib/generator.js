"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var writer = _interopRequireWildcard(require("./writer"));

var _list = _interopRequireDefault(require("./source/list"));

var _csv = _interopRequireDefault(require("./source/csv"));

var _folder = _interopRequireDefault(require("./source/folder"));

var _sprite = _interopRequireDefault(require("./source/sprite"));

var _commander = _interopRequireDefault(require("commander"));

var _async = _interopRequireDefault(require("async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default() {
  _commander.default.version("0.0.1").option("-c --csv <csv>", "CSV file path").option("-d --directory <directory>", "SVG folder").option("-l --list <list>", "List of files").option("-o --output <output>", "Out put to file").option("-s --sprite <sprite>", "Another sprite file").parse(process.argv);

  let fnList = ["sprite", "csv", "directory", "list"].filter(function (i) {
    return !!_commander.default[i];
  }).map(function (i) {
    switch (i) {
      case "sprite":
        return (0, _sprite.default)(_commander.default.sprite);

      case "csv":
        return (0, _csv.default)(_commander.default.csv);

      case "directory":
        return (0, _folder.default)(_commander.default.directory);

      case "list":
        return (0, _list.default)(_commander.default.list.split(",").map(function (i) {
          return i.trim();
        }));
    }
  }); // process them all

  _async.default.map(fnList, function (fn, callback) {
    fn().then(function (objects) {
      callback(false, objects);
    }, function (error) {
      callback(true, error);
    });
  }, function (err, results) {
    if (results.length == 0) {
      return;
    } // reduces the results into one


    let svgs = results.reduce(function (prev, curr) {
      return prev.concat(curr);
    }, []);

    if (_commander.default.output) {
      writer.writeToFile(_commander.default.output, svgs);
    } else {
      writer.writeToConsole(svgs);
    }
  });
}

;
