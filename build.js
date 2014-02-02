'use strict';
var browserify = require('browserify');

var bfy = browserify().require(require.resolve('./main'), { entry: true });

var go = module.exports = function () {
  return bfy.bundle({ debug: true });
}
