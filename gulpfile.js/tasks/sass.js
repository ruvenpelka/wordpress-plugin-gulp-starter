//
// GULP.SASS
//



var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')({ camelize: true }),
    config      = require('../../gulpconfig').sass,
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src(config.src)
        .pipe(gutil.env.env === 'production' ? gutil.noop() : plugins.sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gutil.env.env === 'production' ? plugins.cleanCss() : gutil.noop())
        .pipe(gutil.env.env === 'production' ? gutil.noop() : plugins.sourcemaps.write('./')) // Writes an external sourcemap
        .pipe(gulp.dest(config.dest));
});

gulp.task('watch:sass', function() {
    return plugins.watch(config.src, function () {
        gulp.start('sass');
    });
});