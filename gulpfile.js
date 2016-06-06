'use strict';

/**
 * Module Dependencies
 */
var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var lib = require('bower-files')();
var rimraf = require('rimraf');
var path = require('path');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();

// Variables
var args = {
    dir : './dist/',
    basename : 'main',
    html : {
        src : 'app/index.html',
        files : [
            'app/index.html'
        ],
        dir : ''
    },
    sass : {
        files : [
            'app/scss/**/*.scss'
        ],
        src : 'app/scss/app.scss',
        dir : 'styles'
    },
    scripts : {
        files : [
            'app/scripts/**/*.js',
            'app/scripts/**/*.hbs',
            'app/scripts/**/*.json'
        ],
        src : 'app/scripts/app.js',
        dir : 'scripts',
        browserify : {
            transform : ['hbsfy'],
            extensions : ['.hbs'],
            insertGlobals : true,
            debug : !gulp.env.production
        }
    },
    fonts : {
        files : [
            'app/fonts/**/*.eot',
            'app/fonts/**/*.svg',
            'app/fonts/**/*.ttf',
            'app/fonts/**/*.woff',
            'app/fonts/**/*.woff2'
        ],
        src : [
            'app/fonts/**/*.eot',
            'app/fonts/**/*.svg',
            'app/fonts/**/*.ttf',
            'app/fonts/**/*.woff',
            'app/fonts/**/*.woff2'
        ],
        dir : 'fonts'
    },
    images : {
        files : 'app/images/**/*',
        src : 'app/images/**/*',
        dir : 'images'
    }
};

// Tasks
gulp.task('html', function() {
    return gulp.src('./app/index.html').
            pipe(plugin.plumber({ errorHandler : plugin.notify.onError('HTML Error: <%= error.message %>') })).
            pipe(gulp.dest(path.join(args.dir, args.html.dir))).
            pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(args.sass.src).
            pipe(plugin.sass().on('error', plugin.notify.onError('Sass Error: <%= error.message %>'))).
            pipe(plugin.if(gulp.env.production, plugin.minifyCss())).
            pipe(plugin.rename({ basename : args.basename })).
            pipe(gulp.dest(path.join(args.dir, args.sass.dir))).
            pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return browserify(args.scripts.src, args.scripts.browserify).
            bundle().
            on('error', plugin.notify.onError('JS Error: <%= error.message %>')).
            pipe(source(args.basename + '.js')).
            pipe(buffer()).
            pipe(plugin.if(gulp.env.production, plugin.uglify({ mangle : true }))).
            pipe(gulp.dest(path.join(args.dir, args.scripts.dir))).
            pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src(args.fonts.src).
            pipe(gulp.dest(path.join(args.dir, args.fonts.dir))).
            pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src(args.images.src).
            pipe(gulp.dest(path.join(args.dir, args.images.dir))).
            pipe(browserSync.stream());
});

gulp.task('bower-scripts', function() {
    return gulp.src(lib.ext('js').files).
            pipe(plugin.concat('libs.js')).
            pipe(plugin.uglify()).
            pipe(gulp.dest(path.join(args.dir, args.scripts.dir)));
});

gulp.task('bower-styles', function() {
    return gulp.src(lib.ext('css').files).
            pipe(plugin.minifyCss()).
            pipe(plugin.concat('libs.css')).
            pipe(gulp.dest(path.join(args.dir, args.sass.dir)));
});

gulp.task('bower-fonts', function() {
    var bowerDir = lib._config.dir.substring(lib._config.cwd.length + 1);
    return gulp.src(path.join(bowerDir, '**/*/fonts/**/*')).
            pipe(plugin.flatten()).
            pipe(gulp.dest(path.join(args.dir, args.fonts.dir)));
});

gulp.task('bower-images', function() {
    var bowerDir = lib._config.dir.substring(lib._config.cwd.length + 1);
    return gulp.src(path.join(bowerDir, '**/*/images/**/*')).
            pipe(plugin.flatten()).
            pipe(gulp.dest(path.join(args.dir, args.fonts.dir)));
});

gulp.task('build', [
    'html',
    'sass',
    'scripts',
    'fonts',
    'images',
    'bower-scripts',
    'bower-styles',
    'bower-fonts',
    'bower-images'
]);

gulp.task('clean', function(done) {
    rimraf(args.dir, done);
});

gulp.task('clean-y-build', function(done) {
    runSequence('clean', 'build', done);
});

gulp.task('watch', ['clean-y-build'], function() {
    browserSync.init({
        server : { baseDir : args.dir }
    });

    gulp.watch(args.html.files, ['html']);
    gulp.watch(args.sass.files, ['sass']);
    gulp.watch(args.scripts.files, ['scripts']);
    gulp.watch(args.fonts.files, ['fonts']);
    gulp.watch(args.images.files, ['images']);
});
