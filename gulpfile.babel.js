import gulp from 'gulp';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import grollup from 'rollup-stream';
import rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const babelOptions = {
  exclude: 'node_modules/**',
  presets: [
    [ 'es2015', { modules: false } ],
    'react'
  ],
  plugins: [ 'external-helpers' ],
  babelrc: false
};

gulp.task( 'connect', ()  => {
  connect.server({
    root: [ 'test', 'dist' ],
    livereload: true
  });
});

gulp.task( 'lint', () => {
  return gulp.src( 'src/js/**/*.js' )
              .pipe( eslint() )
              .pipe( eslint.format() )
              .pipe( eslint.failAfterError() );
});

gulp.task( 'lint:test', () => {
  return gulp.src( 'test/src/js/**/*.js' )
              .pipe( eslint() )
              .pipe( eslint.format() )
              .pipe( eslint.failAfterError() );
});

gulp.task( 'scripts:main', [ 'lint' ], ()  => {
  return grollup({
    entry: 'src/js/index.js',
    external: [ 'react', 'react-dom', 'classnames', 'visionmedia-debug' ],
    format: 'umd',
    sourceMap: true,
    moduleName: 'ReactRibbon',
    moduleId: 'react-ribbon',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'classnames': 'classNames',
      'visionmedia-debug': 'debug'
    },
    plugins: [
      babel( babelOptions ),
      nodeResolve({
        jsnext: true,
        extensions: [ '', '.js', '.jsx' ]
      }),
      commonjs()
    ],
    rollup                                            //! <<< Use external rollup
  })
  .pipe( source( 'bundle.js' ) )
  .pipe( buffer() )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
  .pipe( sourcemaps.write( '.' ) )
  .pipe( gulp.dest( './dist' ) )
  .pipe( connect.reload() );
});

gulp.task( 'scripts:uglify', [ 'lint' ], ()  => {
  return grollup({
    entry: 'src/js/index.js',
    external: [ 'react', 'react-dom', 'classnames', 'visionmedia-debug' ],
    format: 'umd',
    sourceMap: true,
    moduleName: 'ReactRibbon',
    moduleId: 'react-ribbon',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'classnames': 'classNames',
      'visionmedia-debug': 'debug'
    },
    plugins: [
      babel( babelOptions ),
      nodeResolve({
        jsnext: true,
        extensions: [ '', '.js', '.jsx' ]
      }),
      commonjs(),
      uglify()
    ],
    rollup                                            //! <<< Use external rollup
  })
  .pipe( source( 'bundle.min.js' ) )
  .pipe( buffer() )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
  .pipe( sourcemaps.write( '.' ) )
  .pipe( gulp.dest( './dist' ) )
  .pipe( connect.reload() );
});

gulp.task( 'scripts', [ 'scripts:main', 'scripts:uglify' ] );

gulp.task( 'scripts:test', [ 'lint:test' ], ()  => {
  return grollup({
    entry: 'test/src/js/index.js',
    external: [ 'react', 'react-dom', 'classnames', 'jquery', 'react-ribbon', 'visionmedia-debug' ],
    format: 'umd',
    sourceMap: true,
    moduleName: 'ReactRibbonTest',
    moduleId: 'react-ribbon-test',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'classnames': 'classNames',
      'jquery': 'jQuery',
      'react-ribbon': 'ReactRibbon',
      'visionmedia-debug': 'debug'
    },
    plugins: [
      babel( babelOptions ),
      nodeResolve({
        jsnext: true,
        extensions: [ '', '.js', '.jsx' ]
      }),
      commonjs()
    ],
    rollup                                            //! <<< Use external rollup
  })
  .pipe( source( 'test.js' ) )
  .pipe( buffer() )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
  .pipe( sourcemaps.write( '.' ) )
  .pipe( gulp.dest( './dist' ) )
  .pipe( connect.reload() );
});

gulp.task( 'styleSheets', ()  => {
  return gulp.src( './src/css/index.css' )
          .pipe( sourcemaps.init( { loadMaps: true } ) )
          .pipe( concat( 'bundle.css' ) )
          .pipe( cleanCSS() )
          .pipe( sourcemaps.write( '.', {
            sourceRoot: 'src/css'
          }))
          .pipe( gulp.dest( 'dist' ) )
          .pipe( connect.reload() );
});

gulp.task('html', function () {
  gulp.src( './test/*.html' )
        .pipe( connect.reload() );
});

gulp.task( 'watch', ()  => {
  gulp.watch( [ './test/*.html' ], [ 'html' ] );
  gulp.watch( [ './src/css/*.css' ], [ 'styleSheets' ] );
  gulp.watch( [ './src/js/*.{js,jsx}', './src/js/data/*.{js,jsx}' ], [ 'scripts', 'scripts:test' ] );
  gulp.watch( [ './test/src/js/*.{js,jsx}', './test/src/js/**/*.{js,jsx}' ], [ 'scripts:test' ] );
});

gulp.task( 'default', [ 'connect', 'scripts', 'scripts:test', 'styleSheets', 'html', 'watch' ] );
