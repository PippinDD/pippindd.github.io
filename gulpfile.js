var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	react = require('gulp-react'),
	browserSync = require('browser-sync');

var resourcePath = 'xmas/assets/',
	resource = {
		css: resourcePath + 'css/**/*.css',
		scss: resourcePath + 'css/*.scss',
		fonts: resourcePath + 'fonts/**/*.*',
		js: resourcePath + 'js/**/*.*',
		jsx: resourcePath + 'jsx/**/*.*'
	},

	tempPath = 'temp/',
	temp = {
		css: tempPath + 'assets/css/',
		fonts: tempPath + 'assets/fonts/',
		js: tempPath + 'assets/js/',

		scss: tempPath + 'scss/',
		jsx: tempPath + 'jsx/'
	},

	static = {
		js: 'xmas/js/'
	},

	outputPath = 'xmas/dist/',
	output = {
		css: outputPath + 'css/',
		fonts: outputPath + 'fonts/',
		js: outputPath + 'js/'
	};

gulp.task('xmas-sass', function() {
	return gulp.src(resource.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(temp.scss));
});

gulp.task('xmas-react', function(){
	return gulp.src([
		resource.js,
		resource.jsx
	])
		.pipe(concat('app.jsx'))
		.pipe(gulp.dest(temp.jsx))
		.on('end', function() {
			return gulp.src(temp.jsx + '*.jsx')
				.pipe(react())
				.pipe(gulp.dest(temp.js + 'xmas/'));
		});
});

gulp.task('build-lib', function(){
	jsLibs = [
		static.js + 'jquery-2.1.4.min.js',
		static.js + 'jquery.slot.js',
		static.js + 'bootstrap-3.3.6-dist/js/bootstrap.js',
		static.js + 'react-0.13.3/react-with-addons.js',
		static.js + 'cortex-0.8.7/cortex.js',
		static.js + 'director-1.2.6/director.min.js',
		static.js + 'lodash-3.10.1/lodash.min.js'
	];

	return gulp.src(jsLibs)
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(temp.js))
		.on('end', function() {
			return gulp.src([
				static.js + 'bootstrap-3.3.6-dist/css/bootstrap.css',
				static.js + 'bootstrap-3.3.6-dist/css/bootstrap-theme.css'
			])
				.pipe(concat('libs.css'))
				.pipe(gulp.dest(temp.css))
				.on('end', function() {
					return gulp.src([
						static.js + 'bootstrap-3.3.6-dist/fonts/*.*'
					])
						.pipe(gulp.dest(temp.fonts));
				});
		});
});

gulp.task('xmas-style', ['xmas-sass'], function(){
	return gulp.src([
			resource.css
		])
		.pipe(concat('style.css'))
		.pipe(gulp.dest(temp.css))
		.on('end', function(){
			return gulp.src(resource.fonts)
				.pipe(gulp.dest(temp.fonts));
		});
});

gulp.task('xmas-prepare-temp', ['xmas-react', 'xmas-style', 'build-lib']);

gulp.task('xmas-local-build', ['xmas-prepare-temp'], function() {
	return gulp.src(temp.css + '**/*.css')
		.pipe(gulp.dest(output.css))
		.on('end', function(){
			return gulp.src(temp.fonts + '**/*.*')
				.pipe(gulp.dest(output.fonts))
				.on('end', function() {
					return gulp.src(temp.js + '**/*.js')
						.pipe(gulp.dest(output.js));
				})
		})
});

gulp.task('browser-sync', function() {
	browserSync({
		proxy: 'localhost',
		port: 8081,
		startPath: 'xmas/index.html',
		injectChanges: false,
		notify: false
	});
});

gulp.task('xmas-dev', ['xmas-local-build', 'browser-sync'], function(){
	// watch html file
	gulp.watch([
		'**/*.html'
	], [browserSync.reload]);

	// watch jsx & js files
	gulp.watch([
		resource.js,
		resource.jsx
	], ['xmas-react', 'xmas-local-build', browserSync.reload]);

	// watch sass & css files
	gulp.watch([
		resource.scss,
		resource.css
	], ['xmas-style', 'xmas-local-build', browserSync.reload]);
});
