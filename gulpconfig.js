// ==== CONFIGURATION ==== //

// Project paths
var project     = 'starter-plugin'                      // The directory name for your plugin; change this at the very least!
  , src         = './src/'                              // The raw material of your plugin: custom scripts, SCSS source files, PHP files, images, etc.; do not delete this folder!
  , build       = './wp/wp-content/plugins/'+project+'/' // A temporary directory containing a development version of your theme; delete it anytime
  , dist        = './dist/'+project+'/'                 // The distribution package that you'll be uploading to your server; delete it anytime
  , bower       = './bower_components/'                 // Bower packages
  , modules     = './node_modules/'                     // npm packages
;

// Project settings
module.exports = {

  browsersync: {
    files: [build+'/**', '!'+build+'/**.map'] // Exclude map files
  , notify: true // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not)
  , open: true // Set to false if you don't like the browser window opening automatically
  , port: 3000 // Port number for the live version of the site; default: 3000
  , proxy: 'localhost:8888/_github-repos/wordpress-plugin-gulp-starter/wp' // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the plugin to work
  , watchOptions: {
      debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads
    }
  },

  deploy: {
    ftp: {
      dist: build
      , remotePath: '/public_html/wp-content/plugins/'+project
      , deploy: {
        host:       'website.com'
        , user:     'johndoe'
        , password: '1234'
        , parallel: 10
      }
    }
    , sftp: {
      dist: build
      , deploy: {
        host:         'website.com'
        , user:       'johndoe'
        , pass:       '1234'
        , remotePath: '/public_html/wp-content/plugins/'+project
      }
    }
  },

  images: {
    build: { // Copies images from `src` to `build`; does not optimize
      src: src+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)'
    , dest: build
    }
  , dist: {
      src: [dist+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)', '!'+dist+'screenshot.png'] // The source is actually `dist` since we are minifying images in place
    , imagemin: {
        optimizationLevel: 7
      , progressive: true
      , interlaced: true
      }
    , dest: dist
    }
  },

  scripts: {
    build: {
      src: src+'**/*.js'
    , dest: build
    }
  },

  styles: {
    build: {
      src: src+'scss/**/*.scss'
    , dest: build
    }
  , compiler: 'libsass' // Choose a Sass compiler: 'libsass' or 'rubysass'
  , autoprefixer: { browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4'] } // This tool is magic and you should use it in all your projects :)
  , minify: { safe: true }
  , rubySass: { // Requires the Ruby implementation of Sass; run `gem install sass` if you use this; Compass is *not* included by default
      loadPath: ['./src/scss', bower, modules] // Adds Bower and npm directories to the load path so you can @import directly
    , precision: 6
    , sourcemap: true
  }
  , libsass: { // Requires the libsass implementation of Sass (included in this package)
      includePaths: ['./src/scss', bower, modules] // Adds Bower and npm directories to the load path so you can @import directly
    , precision: 6
    , onError: function(err) {
        return console.log(err);
      }
    }
  },

  plugin: {
    lang: {
      src: src+'languages/**/*' // Glob pattern matching any language files you'd like to copy over; we've broken this out in case you want to automate language-related functions
    , dest: build+'languages/'
    }
  , php: {
      src: src+'**/*.php' // This simply copies PHP files over; both this and the previous task could be combined if you like
    , dest: build
    }
  , css: {
      src: src+'**/*.css' // This simply copies CSS files over; both this and the previous task could be combined if you like
    , dest: build
    }
  , js: {
      src: src+'**/*.js' // This simply copies JS files over; both this and the previous task could be combined if you like
    , dest: build
    }
  , fonts: {
      src: src+'**/*(*.eot|*.svg|*.ttf|*.woff)' // This simply copies JS files over; both this and the previous task could be combined if you like
    , dest: build
    }
  },

  utils: {
    clean: [build+'**/.DS_Store'] // A glob pattern matching junk files to clean out of `build`; feel free to add to this array
  , wipe: [dist] // Clean this out before creating a new distribution copy
  , build: [build] // Clean this out before creating a new distribution copy
  , dist: {
      src: [build+'**/*', '!'+build+'**/*.map']
    , dest: dist
    }
  },

  watch: { // What to watch before triggering each specified task; if files matching the patterns below change it will trigger BrowserSync or Livereload
    src: {
      styles:       src+'scss/**/*.scss'
    , scripts:      src+'**/*.js' // You might also want to watch certain dependency trees but that's up to you
    , images:       src+'**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)'
    , plugin:       src+'**/*.php'
    , livereload:   build+'**/*'
    }
  }
};
