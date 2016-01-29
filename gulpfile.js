var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var replace = require('gulp-replace');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCss = require('gulp-minify-css');

gulp.task('create-css', function() {
	var darkTheme = gulp.src(['./bower_components/dat-gui/src/dat/gui/style.css', './src/color-picker.css']);

	var lightTheme = gulp.src(['./dat-gui-light-theme/dat-gui-light-theme.css', './src/light-theme-overrides.css'])
		.pipe(replace(/\.dg/g, 'dat-gui[light] .dg'));

	return merge(darkTheme, lightTheme)
		.pipe(replace(/\[type=["']?text["']?\]/g, ':not([type="checkbox"])' +
			':not([type="button"]):not([type="color"]):not([type="file"])' +
			':not([type="hidden"]):not([type="image"]):not([type="radio"])' +
			':not([type="range"])'))
		.pipe(concat('ng-dat.gui.css'))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('create-min-css', ['create-css'], function() {
	return gulp.src('./dist/ng-dat.gui.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename('ng-dat.gui.min.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('minify', function() {
	return gulp.src('./src/**.js')
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(rename('ng-dat.gui.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', ['minify', 'create-min-css'], function() {
	return gulp.src('./src/ng-dat-gui.js')
		.pipe(gulp.dest('./dist/'));
});
