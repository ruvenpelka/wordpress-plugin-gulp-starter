//
// GULP.MAIN
//



var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true });

// Default
gulp.task('default', function(callback) {
    plugins.sequence(
        // Remove all files from build folder, to start with clean slate
        'clean:files',
        // Copy all files from src to build and svn-repo and compile Sass
        ['files', 'svn-files', 'sass'],
        // Start BrowserSync
        'browsersync',
        // Start watching for file changes
        ['watch:files', 'watch:svn-files', 'watch:sass'],
        callback
    );
});