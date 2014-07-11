var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('gulp-shell');
var shelljs = require('shelljs');

var paths = {
  // all our client app js files, not including 3rd party js files
  audio: ['audiolib/src/main.js', 'audiolib/src/buildGrid.js', 'audiolib/src/playLoop.js', 'audiolib/src/getSound.js', 'audiolib/src/sound.js', 'audiolib/src/playGrid.js'],
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['audio', 'serve-ionic']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('audio', function(){
  gulp.src(paths.audio)
    .pipe(concat('audiow.js'))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('serve-ionic', sh.task([
  'ionic serve'
]));

gulp.task('watch', function() {
  gulp.watch(paths.audio, ['audio']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!shelljs.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
