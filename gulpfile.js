var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');


var nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
  gulp.src('scss/styles.scss')
    .pipe(sass({ includePaths: ['scss'] }))
    .pipe(sourcemaps.init())
      .pipe(sourcemaps.write({
        includeContent: false
      }))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', function () {
  var files = [
    '**/*.html',
    '*.html',
    'css/*.css',
    'js/*.js',
    'scss/**/*.scss'
  ];

  browserSync.init(files, {
    server: {
      port: 3000,
      baseDir: './'
    }
  });
});

gulp.task('imagemin', function () {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img/'))
});

gulp.task('default', ['sass', 'browser-sync', 'imagemin', 'nodemon'], function () {
  gulp.watch("scss/**/*.scss", ['sass', browserSync.reload]);
  gulp.watch("img/**/*.jpg", ['imagemin', browserSync.reload]);
  gulp.watch("*.html", [browserSync.reload]);
});


gulp.task('nodemon', function (cb) {
    console.log('NODEMON!!!!!!!!!!!!!!!!!!!!!');
    var started = false;
    return nodemon({
        script: 'server/server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});