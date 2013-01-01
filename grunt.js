module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      files: ['grunt.js'],
      tasks: 'wbb:html'
    },

    sass: {
      compile: {
        files: {
          'src/css/main.css': 'src/sass/*.scss'
        }
      }
    },

    shell: {
      make_html: {
        command: 'make html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('wbb:html', 'sass:compile');
};
