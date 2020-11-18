var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
const { series } = require('gulp');

gulp.task('browserify', async function(){
    browserify('./src/js/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', async function(){
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/css/*.*').pipe(gulp.dest('dist/css'));     
    gulp.src('src/images/*.*').pipe(gulp.dest('dist/images'));   
    gulp.src('src/js/vendors/*.*').pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', series('browserify', 'copy'));
});

gulp.task('default', series('browserify', 'copy', 'watch'));
