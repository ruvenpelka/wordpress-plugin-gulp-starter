// ==== PLUGIN ==== //

var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')({ camelize: true })
  , config      = require('../../gulpconfig').plugin
;

// Copy PHP source files to the `build` folder
gulp.task('plugin-php', function() {
  return gulp.src(config.php.src)
  .pipe(plugins.changed(config.php.dest))
  .pipe(gulp.dest(config.php.dest));
});

// Copy CSS source files to the `build` folder
gulp.task('plugin-css', function() {
  return gulp.src(config.css.src)
      .pipe(plugins.changed(config.css.dest))
      .pipe(gulp.dest(config.css.dest));
});

// Copy JS source files to the `build` folder
gulp.task('plugin-js', function() {
  return gulp.src(config.js.src)
      .pipe(plugins.changed(config.js.dest))
      .pipe(gulp.dest(config.js.dest));
});

// Copy JS source files to the `build` folder
gulp.task('plugin-fonts', function() {
  return gulp.src(config.fonts.src)
      .pipe(plugins.changed(config.fonts.dest))
      .pipe(gulp.dest(config.fonts.dest));
});

// Copy everything under `src/languages` indiscriminately
gulp.task('plugin-lang', function() {
  return gulp.src(config.lang.src)
  .pipe(plugins.changed(config.lang.dest))
  .pipe(gulp.dest(config.lang.dest));
});

// All the theme tasks in one
gulp.task('plugin', ['plugin-lang', 'plugin-php', 'plugin-css', 'plugin-js', 'plugin-fonts']);
