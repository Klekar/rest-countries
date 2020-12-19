module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["src/less"]
                },
                files: {
                    'public/styles.css': 'src/less/*.less'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public',
                    ext: '.min.css'
                }]
            }
        },
        babel: {
            development: {
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    sourceMaps: true,
                    minified: false
                },
                files: {
                    'public/script.js': 'src/script/*.js'
                }
            }
        },
        copy: {
            libs: {
                expand: true,
                src: 'lib/**',
                dest: 'public'
            }
        },
        htmlbuild: {
            development: {
                src: 'src/*.html',
                dest: 'public/',
                options: {
                    beautify: true,
                    relative: true,
                    basePath: false,
                    scripts: {
                        main: 'public/script.js',
                        libs: 'public/lib/*js'
                    },
                    styles: {
                        styles: 'public/styles.css'
                    }
                }
            }
        },
        watch: {
            less: {
                files: 'src/less/*.less',
                tasks: ['make-css']
            },
            script: {
                files: 'src/script/*.js',
                tasks: ['babel']
            },
            html: {
                files: 'src/*.html',
                tasks: ['htmlbuild']
            }
        },
        clean: {
            clean: ['public'],
            post_build: {
                release: ['public/*.css', '!public/*.min.css']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('make-css', ['less', 'cssmin']);
    grunt.registerTask('build', ['clean:clean', 'make-css', 'babel', 'copy', 'htmlbuild', 'clean:post_build']);
    grunt.registerTask('default', 'build');
};