module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
         sass: {
            files: ['sass/**/*.{scss,sass}', 'js/**/*.js'],
            tasks: ['sass:dist', 'browserify:dist']
         }
      },
      sass: {
         options: {
            sourceMap: true,
            outputStyle: 'compressed'
         },
         dist: {
            files: {
               'combined_files/css/styles.css': 'sass/main.scss'
            }
         }
      },
      browserify: {
         dist: {
            src: ['js/app.js'],
            dest: 'combined_files/js/script.js'
         }
      }
   });
   grunt.registerTask('default', ['sass:dist', 'browserify:dist']);
   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-contrib-watch');
};
