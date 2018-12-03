var gulp = require("gulp");
var sass = require("gulp-sass")
var minCss = require("gulp-clean-css")
var server = require("gulp-webserver")
var uglify = require("gulp-uglify");
var path = require("path")
var url = require("url")
var fs = require("fs")
gulp.task("sass",() => {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest('./src/css')) 
})

gulp.task("watch",() => {
    return gulp.watch('./src/scss/*.scss',gulp.series('sass'))
})

gulp.task('dev',gulp.series('sass','watch'))

