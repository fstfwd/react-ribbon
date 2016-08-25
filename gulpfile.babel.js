import gulp from 'gulp';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const babelOptions = {
  exclude: 'node_modules/**',
  presets: [ 'es2015-rollup', 'react' ],
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
  return rollup({
    entry: 'src/js/index.js',
    external: [ 'react', 'react-dom', 'classnames', 'visionmedia-debug' ],
    plugins: [
      babel( babelOptions ),
      nodeResolve({
        jsnext: true,
        extensions: [ '', '.js', '.jsx' ]
      }),
      commonjs()
    ]
  }).then( ( bundle ) => {
    bundle.generate({
      format: 'umd',
      sourceMap: true,
      moduleName: 'ReactRibbon',
      moduleId: 'react-ribbon',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'classnames': 'classNames',
        'visionmedia-debug': 'debug'
      }
    });

    bundle.write({
      format: 'umd',
      moduleName: 'ReactRibbon',
      moduleId: 'react-ribbon',
      sourceMap: true,
      dest: 'dist/bundle.js',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'classnames': 'classNames',
        'visionmedia-debug': 'debug'
      }
    });
  });
});

gulp.task( 'scripts:uglify', [ 'lint' ], ()  => {
  return rollup({
    entry: 'src/js/index.js',
    external: [ 'react', 'react-dom', 'classnames', 'visionmedia-debug' ],
    plugins: [
      babel( babelOptions ),
      nodeResolve({
        jsnext: true,
        extensions: [ '', '.js', '.jsx' ]
      }),
      commonjs(),
      uglify()
    ]
  }).then( ( bundle ) => {
    bundle.generate({
      format: 'umd',
      sourceMap: true,
      moduleName: 'ReactRibbon',
      moduleId: 'react-ribbon',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'classnames': 'classNames',
        'visionmedia-debug': 'debug'
      }
    });

    bundle.write({
      format: 'umd',
      moduleName: 'ReactRibbon',
      moduleId: 'react-ribbon',
      sourceMap: true,
      dest: 'dist/bundle.min.js',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'classnames': 'classNames',
        'visionmedia-debug': 'debug'
      }
    });
  });
});

gulp.task( 'scripts', [ 'scripts:main', 'scripts:uglify' ] );

gulp.task( 'scripts:test', [ 'lint:test' ], ()  => {
  return rollup({
    entry: 'test/src/js/index.js',
    external: [ 'react', 'react-dom', 'classnames', 'jquery', 'react-ribbon', 'visionmedia-debug' ],
    plugins: [
      babel( babelOptions ),
      nodeResolve({
        jsnext: true,
        extensions: [ '', '.js', '.jsx' ]
      }),
      commonjs()
    ]
  }).then( ( bundle ) => {
    bundle.generate({
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
      }
    });

    bundle.write({
      format: 'umd',
      moduleName: 'ReactRibbonTest',
      moduleId: 'react-ribbon-test',
      sourceMap: true,
      dest: 'dist/test.js',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'classnames': 'classNames',
        'jquery': 'jQuery',
        'react-ribbon': 'ReactRibbon',
        'visionmedia-debug': 'debug'
      }
    });
  });
});

gulp.task( 'styleSheets', ()  => {
  return gulp.src( './src/css/index.css' )
          .pipe( sourcemaps.init( { loadMaps: true } ) )
          .pipe( concat( 'bundle.css' ) )
          .pipe( cleanCSS() )
          .pipe( sourcemaps.write( '.', {
            sourceRoot: 'src/css'
          }))
          .pipe( replace(
              '"sourceRoot":"src/css"',
              '"sourceRoot":"../src/css"'
          ))
          .pipe( gulp.dest( 'dist' ) )
          .pipe( connect.reload() );
});

gulp.task('html', function () {
  gulp.src( './test/*.html' )
        .pipe( connect.reload() );
});

// For rollup livereload
gulp.task( 'livereload', () => {
  return gulp.src( './dist/*.js' )
                .pipe( connect.reload() );
});

gulp.task( 'watch', ()  => {
  gulp.watch( [ './test/*.html' ], [ 'html' ] );
  gulp.watch( [ './src/css/*.css' ], [ 'styleSheets' ] );
  gulp.watch( [ './src/js/*.{js,jsx}', './src/js/data/*.{js,jsx}' ], [ 'scripts', 'scripts:test', 'livereload' ] );
  gulp.watch( [ './test/src/js/*.{js,jsx}', './test/src/js/**/*.{js,jsx}' ], [ 'scripts:test', 'livereload' ] );
});

gulp.task( 'default', [ 'connect', 'scripts', 'scripts:test', 'styleSheets', 'html', 'watch' ] );
