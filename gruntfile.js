/**
 * Build Module
 *
 * @author potanin@UD
 * @version 0.0.1
 * @param grunt
 */
module.exports = function( grunt ) {

  grunt.initConfig( {

    pkg: grunt.file.readJSON( 'package.json' ),

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        logo: 'http://media.usabilitydynamics.com/logo.png',
        options: {
          paths: "./lib",
          outdir: './static/codex'
        }
      }
    },

    jscoverage: {
      options: {
        inputDirectory: 'lib',
        outputDirectory: './static/lib-cov',
        highlight: true
      }
    },

    watch: {
      options: {
        interval: 1000,
        debounceDelay: 500
      },
      docs: {
        files: [
          'readme.md'
        ],
        tasks: [ 'markdown' ]
      }
    },

    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: 'static/',
            ext: '.html'
          }
        ],
        options: {
          markdownOptions: {
            gfm: true,
            codeLines: {
              before: '<span>',
              after: '</span>'
            }
          }
        }
      }
    },

    clean: [],

    shell: {
      install: {},
      update: {}
    }

  });

  // Load tasks
  grunt.loadNpmTasks( 'grunt-markdown' );
  grunt.loadNpmTasks( 'grunt-jscoverage' );
  grunt.loadNpmTasks( 'grunt-contrib-yuidoc' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );

  // Build Assets
  grunt.registerTask( 'default', [ 'yuidoc', 'jscoverage', 'markdown' ] );

  // Install environment
  // grunt.registerTask( 'install', [ 'shell:pull', 'shell:install', 'yuidoc', 'markdown', 'less', 'requirejs' ] );

  // Update Environment
  // grunt.registerTask( 'update', [ 'shell:pull', 'shell:update', 'yuidoc', 'markdown', 'less', 'requirejs' ] );

  // Prepare distribution
  // grunt.registerTask( 'dist', [ 'clean', 'yuidoc', 'markdown', 'less', 'requirejs' ] );

  // Update Documentation
  grunt.registerTask( 'doc', [ 'yuidoc', 'jscoverage', 'markdown' ] );

  // Developer Mode
  // grunt.registerTask( 'dev', [ 'watch' ] );

};