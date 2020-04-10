//
// GULP.SVN-FILES
//


var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    config  = require('../../gulpconfig').svn_files,
    del     = require('del'),
    path    = require('path');

gulp.task('svn-files', function() {
    return gulp.src(config.src, { nodir: true })
        .pipe(plugins.changed(config.dest))
        .pipe(gulp.dest(config.dest));
});

gulp.task('watch:svn-files', function() {
    var watcher = plugins.watch(config.src, function () {
        gulp.start('svn-files');
    });
    watcher.on('unlink', function (filepath) {
        var filePathFromSrc = path.relative(path.resolve(config.src_path), filepath);
        var destFilePath = path.resolve(config.dest, filePathFromSrc);
        del.sync(destFilePath);
    });
    return watcher;
});