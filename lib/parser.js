"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Transform an array of SVG content to an array of objects those are
 * ready for sprite generation
 *
 * @param svgs - Array of arrays, each has 2 element, 0 -> id, 1 -> svg content
 * @return contents - Array
 */
function _default(svgs) {
  return svgs.map(function (s) {
    let svgTag = _cheerio.default.load('<div>' + s.content + '</div>', {
      xmlMode: true
    })("svg");

    return svgTag.length ? {
      content: svgTag.html(),
      viewBox: svgTag.attr('viewBox'),
      id: s.id ? s.id : svgTag.attr('id') ? svgTag.attr('id') : undefined
    } : undefined;
  });
}

;
