//
// GULP.CONFIGURATION
//



// Development Environment
var env = require('./gulpenv');

// Project paths
var project = 'starter-plugin',                       // The directory name for your theme; change this at the very least!
    src     = './src/',                               // The raw material of your theme: custom scripts, SCSS source files, PHP files, images, etc.; do not delete this folder!
    build   = './wp/wp-content/plugins/'+project+'/', // A temporary directory containing a development version of your theme; delete it anytime
    svn     = './svn-repo/trunk/',                    // A temporary directory containing a development version of your theme; delete it anytime
    modules = './node_modules/';                      // npm packages

// Project settings
module.exports = {

    browsersync: {
        files:  [build+'/**', '!'+build+'/**.map'], // Exclude map files
        notify: true, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
        open:   env.browsersync.open, // Set to false if you don't like the browser window opening automatically
        port:   env.browsersync.port, // Port number for the live version of the site; default: 3000
        proxy:  env.browsersync.proxy, // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
        watchOptions: {
            debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
        }
    },

    sass: {
        dest: build,
        src:  src + 'scss/**/*.scss'
    },

    copy_files: {
        dest: build,
        src:  [
            src + '**/*',
            '!' + src + 'scss/**',
            '!' + build + '**/.DS_Store'
        ],
        src_path: src,
        build_path: build
    },

    svn_files: {
        dest: svn,
        src:  [
            src + '**/*',
            '!' + src + 'scss/**',
            '!' + build + '**/.DS_Store'
        ],
        src_path: src
    }

};
