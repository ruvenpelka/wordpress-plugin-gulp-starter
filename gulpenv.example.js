//
// GULP.ENV.EXAMPLE
//
// Make a copy of this file, call it 'gulpenv.js', and change the configuration.
//



var modules = './node_modules/'; // npm packages

module.exports = {

    browsersync: {
        open:   true, // Set to false if you don't like the browser window opening automatically
        port:   3000, // Port number for the live version of the site; default: 3000
        proxy:  'localhost:8888/_github-repos/wordpress-plugin-gulp-starter/wp' // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work
    }

};