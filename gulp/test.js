/**
 * Created by mhendren on 3/1/15.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha-co');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {default: {reporter: 'spec'}});

gulp.task('test', function() {
    gulp.src('test/**/*-test.js')
        .pipe(mocha({reporter: options.reporter}));
});