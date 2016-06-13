'use strict';

var jshint = require('gulp-jshint');
var gulp = require('gulp');
var yargs = require('yargs');

var jsHintFiles = ['./lib/*.js', './main.js'];

gulp.task('jsHint', function() {
  var stream = gulp.src(jsHintFiles)
    .pipe(jshint.extract('auto'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  if (yargs.argv.failTaskOnError) {
    stream = stream.pipe(jshint.reporter('fail'));
  }

  return stream;
});
