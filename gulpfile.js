// ////////////////////////////////////////
// Required
// ////////////////////////////////////////
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	uglifyCss = require('gulp-uglifycss'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	plumber = require('gulp-plumber');


// ////////////////////////////////////////
// Browser Sync
// ////////////////////////////////////////
gulp.task('browserSync', function(){
	browserSync.init({
		server: ["app", "dist"]
	});
});

// ////////////////////////////////////////
// Scripts Task
// ////////////////////////////////////////
gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
		.pipe(concat({ path: 'main.min.js', stat: { mode: 0777 }}, {newLine: ';'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}));

});

// ////////////////////////////////////////
// Sass Task
// ////////////////////////////////////////
gulp.task('sass', function(){
	return gulp.src('app/scss/style.scss')
				.pipe(plumber())
				.pipe(sass())
				.pipe(gulp.dest('dist/css'))
				.pipe(browserSync.reload({stream: true}));
});

// ////////////////////////////////////////
// Watch Task
// ////////////////////////////////////////
gulp.task('watch', function(){
	gulp.watch('app/scss/style.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/index.html', browserSync.reload);
});
// ////////////////////////////////////////
// Default Task
// ////////////////////////////////////////
gulp.task('default', ['scripts', 'sass', 'browserSync', 'watch']);
