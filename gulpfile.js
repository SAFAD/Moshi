var gulp         = require('gulp'),
    less         = require('gulp-less'),
    rename       = require('gulp-rename'),
    comb         = require('gulp-csscomb'),
    livereload   = require('gulp-livereload'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('build', function(){
  //first we autoprefix
  //then we comb
  //and then we compile with LESS which is the final step
  return gulp.src('css/moshi.less')
    .pipe(autoprefixer('last 2 versions')) //FIXME: does it autoprefixes *.less?
    .pipe(comb()) //FIXME: combing doesn't go through all the files
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
