var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var less = require('gulp-less');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var gulpSequence = require('gulp-sequence');
var clean = require('gulp-clean');
var minifycss = require('gulp-minify-css');


gulp.task("clean", function(){
    return gulp.src('dist')
        .pipe(clean());
})
gulp.task('clean.tmp', function(cb) {
    del(['dist/tmp'], cb);
});


/*编译less*/
gulp.task('less', function() {
    return gulp.src(['less/**/import.less'])
        .pipe(less())
        .pipe(rename(function (path) {
            path.basename = "main";
        }))
        .pipe(gulp.dest('dist/tmp/css'));
});

/*给css加hash值*/
gulp.task('css.rev', function() {
    return gulp.src(['dist/rev/**/*.json','dist/tmp/css/**/main.css'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
});



gulp.task('default', gulpSequence('clean', 'less', 'css.rev', 'clean.tmp'));


