var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

var paths = {
    scripts: [
        'static/js/libs/jquery.js',
        'static/js/libs/underscore.js',
        'static/js/libs/backbone.js',
        'static/js/init.js',
        'static/js/utils.js',
        'static/js/config.js',
        'static/js/models.js',
        'static/js/views.js',
        'static/js/main.js'
    ],
    styles: [
        'static/css/main.scss'
    ]
};

gulp.task('default', ['compile-styles', 'compile-scripts']);

gulp.task('compile-styles', function() {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/css'));
});

gulp.task('compile-scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
            .pipe(babel({ presets: ['es2015'] }))
            .pipe(uglify().on('error', function(err){throw err;}))
            .pipe(concat('static/js/main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
    // do build stuff
});
