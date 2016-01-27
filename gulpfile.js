var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('minify', function() {
	gulp.src('./src/**.js')
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(rename('ng-dat.gui.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', ['minify'], function() {
	gulp.src('./src/**.js')
		.pipe(gulp.dest('./dist/'));
});
