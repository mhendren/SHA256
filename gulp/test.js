/**
 * Created by mhendren on 3/1/15.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha-co');

gulp.task('test', function() {
    gulp.src('test/**/*-test.js')
        .pipe(mocha({reporter: 'list'}));
});