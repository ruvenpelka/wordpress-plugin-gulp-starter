//
// GULP.FILES
//


var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    config  = require('../../gulpconfig').copy_files,
    del     = require('del'),
    path    = require('path');

gulp.task('files', function() {
    return gulp.src(config.src, { nodir: true })
        .pipe(plugins.changed(config.dest))
        .pipe(gulp.dest(config.dest));
});

gulp.task('clean:files', function() {
    return del(config.build_path);
});

gulp.task('watch:files', function() {
    var watcher = plugins.watch(config.src, function () {
        gulp.start('files');
    });
    watcher.on('unlink', function (filepath) {
        //console.log(filepath);
        var filePathFromSrc = path.relative(path.resolve(config.src_path), filepath);
        //console.log(filePathFromSrc);
        var destFilePath = path.resolve(config.dest, filePathFromSrc);
        //console.log(destFilePath);
        del.sync(destFilePath);
    });
    return watcher;
});

//gulp.task('watch:files', function() {
//    return plugins.watch(config.src, function () {
//        gulp.start('files');
//    });
//});