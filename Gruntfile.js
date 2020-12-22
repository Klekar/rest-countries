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
        concat: {
            options: {
                separator: ';'
            },
            script: {
                dest: 'public/script.js',
                src: ['src/script/imports.js', 'src/script/*.js', '!src/script/main.js', 'src/script/main.js']
            }
        },
        babel: {
            development: {
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    sourceMaps: true
                },
                files: {
                    'public/script.js': 'public/script.js'
                },
                
            },
            release: {  
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                },
                files: {
                    'public/script.js': 'public/script.js'
                },
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
                cwd: 'static-files',
                expand: true,
                src: '**',
                dest: 'public/'
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
                    },
                    sections: {
                        moon_icon: 'public/icons/moon.svg'
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
            },
            static_files: {
                files: 'static-files/**/*',
                tasks: ['copy']
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('make-css', function() {
        grunt.task.run('less');
        if (isRelease) {
            grunt.task.run('cssmin');
        }
    });
    grunt.registerTask('make-js', function() {
        grunt.task.run('concat:script');
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