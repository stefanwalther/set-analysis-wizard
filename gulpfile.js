'use strict';
// core deps
var fs = require( 'fs' );

// packages
var gulp = require( 'gulp' );
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
//var senseGo = require( 'sense-go' );
//var yaml = require( 'js-yaml' );

//var config = yaml.safeLoad( fs.readFileSync( './.sense-go.yml', 'utf8' ) );

//senseGo.init( gulp, config );

// Default task to test the extension locally
//gulp.task( 'default', gulp.series('del:tmp', 'copy:toTmp','transpile', 'less:each', 'copy:tmpToLocal') );

gulp.task('default', function (  ) {
	return gulp.src( './model/**/*.js' )
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest( './out' ));

});

gulp.task('jison', function (  ) {
	return gulp.src('./src/parser/parser.jison')
	.pipe(require('gulp-jison')( {moduleType: 'commonjs'}))
	.pipe(gulp.dest('./.out/parser'))
});

