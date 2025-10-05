module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Clean the dist directory
    clean: {
      dist: ["dist"]
    },
    
    // Copy source files to dist
    copy: {
      dist: {
        files: {
          'dist/js/jquery.tokeninput.js': 'src/jquery.tokeninput.js',
          'dist/css/token-input.css': 'styles/token-input.css',
          'dist/css/token-input-facebook.css': 'styles/token-input-facebook.css',
          'dist/css/token-input-mac.css': 'styles/token-input-mac.css'
        }
      }
    },
    
    // Add version information to JS files
    'string-replace': {
      dist: {
        files: {
          'dist/js/jquery.tokeninput.js': 'dist/js/jquery.tokeninput.js'
        },
        options: {
          replacements: [{
            pattern: 'Version 3.0.0',
            replacement: 'Version <%= pkg.version %>'
          }]
        }
      }
    },
    
    // Concatenate files with banners
    concat: {
      banner: {
        expand: true,
        src: ['dist/js/!(*.min).js'],
        options: {
          banner:
            '/**\n' +
            ' * jQuery Token Input Plugin\n' +
            ' * https://github.com/loopj/jquery-tokeninput\n' +
            ' * Copyright (c) 2009 James Smith (http://loopj.com)\n' +
            ' * Licensed jointly under the GPL and MIT licenses\n' +
            ' * Version <%= pkg.version %>\n' +
            ' */\n'
        }
      },
      bannerMin: {
        expand: true,
        src: ['dist/js/*.min.js'],
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> */'
        }
      },
      // Bundle all themes into one CSS file
      bundleCss: {
        files: {
          'dist/css/jquery.tokeninput.bundle.css': [
            'dist/css/token-input.css',
            'dist/css/token-input-facebook.css',
            'dist/css/token-input-mac.css'
          ]
        }
      }
    },
    
    // UMD wrapper for module compatibility
    // Note: grunt-umd shows a deprecation warning from its dependency on Node.js util.isArray
    // This is a known issue in the plugin and doesn't affect functionality
    umd: {
      dist: {
        options: {
          deps: {
            'default': [{'jquery': '$'}],
            'global': [{jQuery: '$'}]
          },
          src: 'dist/js/**/!(*.min).js'
        }
      }
    },
    
    // Minify JavaScript files
    uglify: {
      options: {
        compress: true,
        mangle: true,
        preserveComments: false
      },
      dist: {
        files: [{
          expand: true,
          ext: '.min.js',
          extDot: 'last',
          src: ['dist/js/**/!(*.min).js']
        }]
      }
    },
    
    // Minify CSS files
    cssmin: {
      dist: {
        files: [
          {
            src: 'dist/css/token-input.css',
            dest: 'dist/css/token-input.min.css'
          },
          {
            src: 'dist/css/token-input-facebook.css',
            dest: 'dist/css/token-input-facebook.min.css'
          },
          {
            src: 'dist/css/token-input-mac.css',
            dest: 'dist/css/token-input-mac.min.css'
          },
          {
            src: 'dist/css/jquery.tokeninput.bundle.css',
            dest: 'dist/css/jquery.tokeninput.bundle.min.css'
          }
        ]
      }
    },
    
    // Create gzipped versions
    compress: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: ['**/*.min.js'],
            dest: 'dist',
            ext: '.js.gz',
            extDot: 'last'
          },
          {
            expand: true,
            cwd: 'dist',
            src: ['**/*.min.css'],
            dest: 'dist',
            ext: '.css.gz',
            extDot: 'last'
          }
        ],
        options: {
          mode: 'gzip',
          level: 9
        }
      }
    },
    
    // JSHint validation
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,  // Allow function hoisting
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: ['src/<%= pkg.name %>.js'],
      ci: {
        options: {
          force: true  // Don't fail build on JSHint warnings in CI
        },
        src: ['src/<%= pkg.name %>.js']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-umd');

  // Tasks
  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('build', [
    'clean:dist',
    'jshint:all',
    'copy',
    'string-replace',
    'concat:bundleCss',
    'concat:banner',
    'umd',
    'uglify',
    'concat:bannerMin',
    'cssmin',
    'compress'
  ]);
  grunt.registerTask('default', ['build']);

};