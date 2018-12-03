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

gulp.task("servers",() => {
    return gulp.src('src')
    .pipe(server({
        port : 9997,
        open : true,
        middleware(req,res,next) {
            var pathname = url.parse(req.url).pathname;
            console.log(pathname)
            if(pathname === '/favicon.ico') {
                res.end('')
                return;
            }
            res.end(fs.readFileSync(path.join(__dirname, 'src' , pathname)))
        }
    }))
})

gulp.task("uglify",() => {
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest("./src/jss"))
})
gulp.task("default",gulp.series('dev','servers','uglify'))
