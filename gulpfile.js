'use strict';
// core deps
var fs = require( 'fs' );

// packages
var gulp = require( 'gulp' );
var senseGo = require( 'sense-go' );
var yaml = require( 'js-yaml' );

var config = yaml.safeLoad( fs.readFileSync( './.sense-go.yml', 'utf8' ) );

senseGo.init( gulp, config );

// Default task to test the extension locally
gulp.task( 'default', gulp.series('del:tmp', 'copy:toTmp','transpile', 'less:each', 'copy:tmpToLocal') );

