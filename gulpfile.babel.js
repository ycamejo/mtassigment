'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import mq from 'gulp-group-css-media-queries';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemap from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import minify from 'gulp-minify';
import browserSync from 'browser-sync';
import nano from 'gulp-cssnano';

sass.compiler = require('node-sass');

const start = (cb) => {

	var started = false;

	return nodemon({
		script: './bin/www'
	})
	.on('start', () => {
		if(!started) {
			cb();
			started = true;
		}
	})
	.on('restart', () => {
		console.log("Restarted");
	});
}

const bs = () => {
	console.log("BS");
	browserSync.init(null, {
		proxy: "http://127.0.0.1:3000",
		port: 3010
	});
}

const reload = () => {
	browserSync.reload();
	console.log("Reloading..");
}

const server = gulp.parallel(bs, start);

const compileSass = () => {
	return gulp.src('./scss/*.scss')
	.pipe(plumber())
	.pipe(sourcemap.init())
	.pipe(sass({
		indentType: 'tab',
		indentWidth: 1,
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(postcss([
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
        })
    ]))
	.pipe(mq())
	.pipe(concat('style.css'))
	.pipe(nano())
	.pipe(sourcemap.write('.'))
	.pipe(gulp.dest('./public/stylesheets'))
	.pipe(browserSync.stream());
};

const compileJs = () => {
	return gulp.src('./public/javascripts/src/**/*.js')
	.pipe(plumber())
	.pipe(sourcemap.init())
	.pipe(babel())
	.pipe(concat('bundle.js'))
	.pipe(minify())
	.pipe(sourcemap.write('.'))
	.pipe(gulp.dest('./public/javascripts/dist'))
	.pipe(browserSync.stream());
};

const html = () => {
	return gulp.src('./views/*.pug')
	.pipe(browserSync.stream());
}

const watchJs = () => {
	gulp.watch('./public/javascripts/src/**/*.js', compileJs);
}

const watchSass = () => {
	gulp.watch('./scss/*.scss', compileSass);
}

const watchPug = () => {
	gulp.watch('./views/**/*.pug', html);
}

const watch = gulp.parallel(watchSass, watchJs, watchPug);
watch.description = "Watching..";

const compile = gulp.parallel(compileSass, compileJs);
compile.description = "Compiling on startup..";

const defaultTasks = gulp.parallel(server, compile, watch);

export default defaultTasks