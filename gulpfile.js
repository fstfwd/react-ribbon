var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

gulp.task( 'connect', function() {
	connect.server({
		root: [ 'test', 'dist' ],
		livereload: true
	});
});

gulp.task( 'scripts', function() {
	browserify( './src/js/index.js', {
		extensions: [ '', '.js', '.jsx'],
		debug: true
	})
		.transform( babelify, {
				presets: [ 'es2015', 'react' ]
		})
		.bundle()
		.on( 'error', gutil.log )
		.pipe( source( 'bundle.js' ) )
		.pipe( buffer() )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( 'dist' ) )
		.pipe( connect.reload() );
});

gulp.task( 'scripts:test', function() {
	browserify( './src/js/test/index.js', {
		extensions: [ '', '.js', '.jsx'],
		debug: true
	})
		.transform( babelify, {
				presets: [ 'es2015', 'react' ]
		})
		.bundle()
		.on( 'error', gutil.log )
		.pipe( source( 'test.js' ) )
		.pipe( buffer() )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( 'dist' ) )
		.pipe( connect.reload() );
});

gulp.task( 'styleSheets', function() {
	return gulp.src( './src/css/index.css' )
					.pipe( concat( 'bundle.css' ) )
					.pipe( sourcemaps.init( { loadMaps: true } ) )
					.pipe( cleanCSS() )
					.pipe( sourcemaps.write( './' ) )
					.pipe( gulp.dest( 'dist' ) )
					.pipe( connect.reload() );
});

gulp.task('html', function () {
	gulp.src( './test/*.html' )
		.pipe( connect.reload() );
});

gulp.task( 'watch', function() {
	gulp.watch( [ './test/*.html' ], [ 'html' ] );
	gulp.watch( [ './src/css/*.css' ], [ 'styleSheets' ] );
	gulp.watch( [ './src/js/*.{js,jsx}', './src/js/data/*.{js,jsx}' ], [ 'scripts', 'scripts:test' ] );
	gulp.watch( [ './src/js/test/*.{js,jsx}', './src/js/test/**/*.{js,jsx}' ], [ 'scripts:test' ] );
});

gulp.task( 'default', [ 'connect', 'scripts', 'scripts:test', 'styleSheets', 'html', 'watch' ] );
