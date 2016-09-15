// ==== SCRIPTS ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').scripts
;

// Minify scripts in place
gulp.task('scripts', function(){
  return gulp.src(config.build.src)
  .pipe(plugins.changed(config.build.dest))
  .pipe(gulp.dest(config.build.dest));
});