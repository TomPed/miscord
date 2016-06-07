var jshint = require('gulp-jshint');
var gulp   = require('gulp');

var jsHintFiles = ['./lib/*.js', './main.js'];

gulp.task('jsHint', function() {
    return gulp.src(jsHintFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});
