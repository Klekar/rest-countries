module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            general: {
                files: {
                    'public/styles.css': 'src/less/*.less'
                }
            }
        },
        cssmin: {
            release: {
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
                    sourceMaps: true
                },
                files: {
                    'public/script.js': ['src/script/*.js', '!src/script/main.js', '!src/script/main.js'] 
                }
            },
            release: {
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
                ,
                files: {
                    'public/script.js': ['src/script/*.js', '!src/script/main.js', '!src/script/main.js'] 
                }
            }
        },
        browserify: {
            general: {
                files: {
                    'public/script.js': 'public/script.js'
                }
            }
        },
        uglify: {
            release: {
                files: {
                    'public/script.js': 'public/script.js'
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
            general: {
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
                tasks: ['make-js']
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
    let isRelease = grunt.option('isRelease') || false;
    let env = isRelease ? "release" : "development";

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.registerTask('make-css', ['less', 'cssmin']);
    grunt.registerTask('make-css', function() {
        grunt.task.run('less');
        if (isRelease) {
            grunt.task.run('cssmin');
        }
    });
    grunt.registerTask('make-js', ['babel', 'browserify', 'uglify']);
    grunt.registerTask('make-js', function() {
        grunt.task.run(['babel:' + env, 'browserify']);
        if (isRelease) {
            grunt.task.run('uglify:' + env);
        }
    });
    grunt.registerTask('build', function () {
        grunt.task.run(['clean:clean', 'make-css:' + isRelease, 'make-js:' + isRelease, 'copy:libs', 'htmlbuild:general']);
    });
    grunt.registerTask('default', 'build');
};