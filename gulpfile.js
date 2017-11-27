var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');

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
      baseDir: './'
    }
  });
});
gulp.task('imagemin', () =>
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('img/'))
);

gulp.task('default', ['sass', 'browser-sync', 'imagemin'], function () {
  gulp.watch("scss/**/*.scss", ['sass', browserSync.reload]);
  gulp.watch("img/**/*.jpg", ['imagemin', browserSync.reload]);
  gulp.watch("*.html", [browserSync.reload]);
});