
module.exports = function(grunt) {

  grunt.registerTask('read-book', 'Reads book content and saves it in configuration', function () {
    var _ = grunt.util._;
    var content = grunt.file.read('src/Book.txt', { encoding: 'utf8' });
    var chapters = _.lines(content).filter(function (line) { return !_.isBlank(line); }).map(function (line) { return 'src/' + line; });
    grunt.verbose.writeln('Found chapters: ' + chapters);
    grunt.config.set('concat.markdown.src', chapters);
    grunt.config.set('copy.chapters.files.builds/leanpub/chapters/', chapters);
  });
};
