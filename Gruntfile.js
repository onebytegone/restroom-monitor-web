module.exports = function(grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      watch: {
         sass: {
            files: ['sass/**/*.{scss,sass}'],
            tasks: ['sass:dist']
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
      }
   });
   grunt.registerTask('default', ['sass:dist', 'watch']);
   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-contrib-watch');
};
