'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            react: {
                files: 'src/**/*.jsx',
                tasks: ['browserify:dev']
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['concat:less', 'less:dev']
            }
        },
        concat: {
            less: {
                src: ['src/**/*.less'],
                dest: 'build/index.less'
            }
        },
        less: {
            dev: {
                files: {
                    'build/index.css': 'build/index.less'
                }
            }
        },
        browserify: {
            dev: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['react', 'es2015']}],
                        require('grunt-react').browserify]
                },
                files: {
                    'build/scripts/index.js': ['src/blocks/**/*.jsx']
                }
            },
            watchClient: {
                src: ['src/blocks/**/*.jsx'],
                dest: 'build/scripts/index.js',
                options: {
                    transform: [
                        ['babelify', {presets: ['react', 'es2015']}],
                        require('grunt-react').browserify],
                    watch: true
                }
            }
        },
        copy: {
            staticContent: {
                files: [
                    // Static
                    {
                        expand: true,
                        cwd: 'src/static',
                        src: ['**'],
                        dest: 'build/'
                    },
                    // Images
                    {
                        src: ['src/**/img/*'],
                        dest: 'build/img/',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        exec: {
            set_path: {
                cmd: 'ln -nsf "' + __dirname + '/src/blocks" node_modules;'
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default',
        [
            'exec:set_path',
            'concat:less',
            'less:dev',
            'browserify:dev',
            'copy:staticContent'
        ]
    );

    grunt.registerTask('wwb',
        [
            'exec:set_path',
            'copy:staticContent',
            'browserify:watchClient',
            'watch:less'
        ]
    );
};
