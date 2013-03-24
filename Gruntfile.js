module.exports = function (grunt) {

  function readBookContent() {
    var _ = grunt.util._;
    var content = grunt.file.read('src/Book.txt', { encoding: 'utf8' });
    var chapters = _.lines(content).filter(function (line) { return !_.isBlank(line); }).map(function (line) { return line; });
    grunt.verbose.writeln('Found chapters: ' + chapters);
    return chapters;
  }

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({

    chapters: readBookContent(),

    watch: {
      files: ['Gruntfile.js', 'src/html/*.html', 'src/chapters/*.md', 'src/sass/*.scss'],
      tasks: 'wbb:html'
    },

    sass: {
      compile: {
        files: {
          'src/css/main.css': 'src/sass/*.scss'
        }
      }
    },

    copy: {

      chapters: {
        files: [
          {
            expand: true,
            cwd: 'src',
            dest: 'builds/leanpub',
            src: '<%= chapters %>',
          }
        ]
      },

      leanpub_images: {
        files: [
        {
          expand: true,
          cwd: 'src/images/',
          src: '**',
          dest: 'builds/leanpub/images'
        }
        ]
      },

      leanpub_files: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '*.txt',
            dest: 'builds/leanpub/'
          }
        ]
      },

      html_images: {
        files: [
          {
            expand: true,
            cwd: 'src/images',
            src: '**',
            dest: 'builds/html/images'
          }
        ]
      },

      minified_css: {
        files: [
          {
            expand: true,
            cwd: 'src/css',
            src: 'main.min.css',
            dest: 'builds/html'
          }
        ]
      },

      mobi: {
        files: [
          {
            expand: true,
            cwd: 'builds/epub',
            src: '*.mobi',
            dest: 'builds/mobi'
          }
        ]
      }
    },

    concat: {
      markdown: {
        src: '<config:chapters>',
        dest: 'src/index.md'
      },

      css: {
        src: 'src/css/*.css',
        dest: 'src/css/main.min.css'
      }
    },

    cssmin: {
      main: {
        files: {
          'src/css/main.min.css': 'src/css/main.min.css'
        }
      }
    },

    shell: {
      make_html: {
        command: 'make html'
      },

      make_epub: {
        command: 'make epub'
      },

      make_epub_dir: {
        command: 'mkdir -p builds && mkdir -p builds/epub'
      },

      make_rtf_dir: {
        command: 'mkdir -p builds && mkdir -p builds/rtf',
      },

      make_rtf: {
        command: 'make rtf'
      },

      make_mobi_dir: {
        command: 'mkdir -p builds && mkdir -p builds/mobi'
      },

      make_mobi: {
        command: 'make mobi'
      },
    },

    clean: {
      tmp: 'tmp',
      css: 'src/css/main.min.css',
      epub: 'builds/epub/*.mobi',
      index: 'src/index.md'
    }
  });


  grunt.registerTask('wbb:html', [
    'concat:markdown',
    'sass:compile',
    'concat:css',
    'cssmin:main',
    'copy:minified_css',
    'copy:html_images',
    'shell:make_html',
    'clean:index',
    'clean:css'
  ]);

  grunt.registerTask('wbb:epub', [
    'concat:markdown',
    'shell:make_epub_dir',
    'shell:make_epub',
    'clean:index'
  ]);

  grunt.registerTask('wbb:rtf', [
    'concat:markdown',
    'shell:make_rtf_dir',
    'shell:make_rtf',
    'clean:index'
  ]);

  grunt.registerTask('wbb:mobi', [
    'wbb:epub',
    'concat:markdown',
    'shell:make_mobi_dir',
    'shell:make_mobi',
    'copy:mobi',
    'clean:epub',
    'clean:index'
  ]);

  grunt.registerTask('wbb:leanpub', [
    'copy:chapters',
    'copy:leanpub_images',
    'copy:leanpub_files'
  ]);

  grunt.registerTask('wbb:publish', [
    'wbb:html',
    'wbb:epub',
    'wbb:rtf',
    'wbb:mobi',
    'wbb:leanpub'
  ]);
};
