/**
 * Created by alen.nikolov on 5.6.2017 г..
 */
var gulp=require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function(){
    return gulp.src('./public/stylesheets/scss/styles.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./public/stylesheets'));
});