/* jshint node: true */
'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let gulpif = require('gulp-if');
let plumber = require('gulp-plumber');
let debug = getArg('--debug');
let autoprefixer = require('gulp-autoprefixer');
let watch = require('gulp-watch');
let replace = require('gulp-replace');

let project = {
	css: __dirname + '/../docs',
	js: __dirname + '/../docs/javascripts'
};

// SCSS zu css
gulp.task('css', function() {
	let config = {};
	if (debug) {
		config.sourceMap = 'inline';
		config.sourceMapEmbed = true;
	}
	if (!debug) {
		config.outputStyle = 'compressed';
	}

	gulp.src(__dirname + '/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass(config).on('error', sass.logError))
		.pipe(sass(config))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(project.css));
});

gulp.task('js', function() {
	gulp.src([__dirname + '/javascripts/**/*.js'])
		.pipe(plumber())
		.pipe(gulpif(!debug, uglify()))
		.pipe(replace('RequireVersionReplaceByCompiling', Date.now()))
		.pipe(gulp.dest(project.js));
});

/*********************************
 *         Watch Tasks
 *********************************/

gulp.task('watch', ['build'], function() {
	watch([__dirname + '/sass/**/*.scss'], function() {
		gulp.start(['css']);
	});
	watch([__dirname + '/javascripts/*.js'], function() {
		gulp.start(['js']);
	});
});

gulp.task('build', ['css', 'js']);

/**
 * Get arguments from commandline
 */
function getArg(key) {
	let argClean = key.replace('--', '').toUpperCase();
	if (argClean in process.env) {
		return process.env[argClean];
	}
	let index = process.argv.indexOf(key);
	let next = process.argv[index + 1];
	return (index < 0) ? null : (!next || next[0] === '-') ? true : next;
}
