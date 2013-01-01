module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
    watch: {
      files: ['grunt.js'],
      tasks: 'wbb:html'
    },

    shell: {
      make_html: {
        command: 'make html'
      }
    }
  });

  grunt.registerTask('wbb:html', 'shell:make_html');
};
