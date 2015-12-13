/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

/*
When
*/

module.exports = function(grunt) {
  // We load our config file were all directories are assigned to variables
  var config = grunt.file.readYAML('gruntconfig.yml');

  grunt.initConfig({
    // You must have the following line in place
    pkg: grunt.file.readJSON('package.json'),
    responsive_images: {
      myTask: {
        options:{
          sizes: [{
            name: "small",
            width: 100,
            height: 75
          }]
        },
        files: [{
          expand: true,
          src: ['pizzeria.jpg'],
          cwd: config.viewsImgSrcDir,
          dest: config.viewsImgDestDir
        }]
      }
    },
    uglify: {
      // These are the build options for uglify
      build: {
        files: {
          [config.jsDestDir + 'perfmatters.js']: [config.jsSrcDir + '*.js'],
          [config.viewsJsDestDir + 'main.js']: [config.viewsJsSrcDir + 'main.js']
        }
      }
    },
    watch : {
      js: {
        files: [config.jsSrcDir + '*.js'], // When this files change
        tasks: ['uglify:dev'] // Run this tasks
      }
    },
    // We specify here which files we clean so they do not grow indefinitely
    clean: [
    config.jsDestDir + 'perfmatters.js',
    config.viewsJsDestDir+'main.js'
    ],
    htmlmin : {
      build : {
        options : {
          removeComments: true,
          collapseWhitespace: true,
          minifyJs: true,
          minifyCSS: true,
          minifyURLs: true
        },
        files : {
          [config.destDir + 'index.html']: [config.srcDir + 'index.html'],
          [config.destDir + 'project-2048.html']: [config.srcDir + 'project-2048.html'],
          [config.destDir + 'project-webperf.html']: [config.srcDir + 'project-webperf.html'],
          [config.destDir + 'project-mobile.html']: [config.srcDir + 'project-mobile.html'],
          [config.viewsDestDir + 'pizza.html']: [config.viewsSrcDir + 'pizza.html']
        }
      }
    },
    imageoptim: {
      myTask:{
        src: [config.imgSrcDir, config.viewsImgSrcDir, config.imgDestDir, config.viewsImgDestDir]
      }
    }
  });

  // If you install "load-grunt-tasks", you can replace all "grunt.loadNpmTasks('...')"
  // by the following line:
  require('load-grunt-tasks')(grunt);
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // // you do not need to register watch you just type "grunt watch"
  // grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['responsive_images','imageoptim']);
  // The following line will work when you run "grunt build" in console
  grunt.registerTask('build', ['clean','uglify:build','htmlmin:build']);

};
