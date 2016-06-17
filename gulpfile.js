var gulp         = require('gulp'),
    less         = require('gulp-less'),
    rename       = require('gulp-rename'),
    comb         = require('gulp-csscomb'),
    livereload   = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefix', function(){
    return gulp.src('css/*.less')
      .pipe(autoprefixer('last 2 versions'))
      .pipe(gulp.dest('css'));
});

gulp.task('comb', function(){
  return gulp.src('css/*.less')
    .pipe(comb())
    .pipe(gulp.dest('css'));
});
//main build task runs after autoprefixing and combing LESS files
gulp.task('build', ['autoprefix', 'comb'], function(){
  return gulp.src('css/moshi.less')
    .pipe(less())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('stylesheets'));
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('css/*.less', ['build']);
  gulp.watch(['stylesheets/**']).on('change', livereload.changed);
});

gulp.task('default', ['build']);
