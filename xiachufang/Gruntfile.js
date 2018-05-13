module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transport: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'components',
                        src: '**/*.js',
                        dest: 'tmp/components'
                    },
                    {
                        expand: true,
                        cwd: 'components',
                        src: '**/*.css',
                        dest: 'tmp/components'
                    }
                ]
            }
        },
        uglify : {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/components',
                        src: ['**/*.js', '!**/*-debug.js'],
                        dest: 'dist/components',
                        ext: '.js'
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',//compact, compressed, expanded
                    sourcemap: 'none'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'components',
                        src: ['**/*.scss', '**/*.sass', '**/*.css'],
                        dest: 'dist/components',
                        ext: '.css'
                    }
                ]
            }
        },
//        cssmin: {
//            dist:{
//                files: [
//                    {
//                        expand: true,
//                        cwd: 'tmp/components',
//                        src: ['**/*.css'],
//                        dest: 'dist/components',
//                        ext: '.css'
//                    }
//                ]
//            }
//        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'components',
                        src: ['**/i/*.{png,jpg,gif}'],
                        dest: 'dist/components',
                    }
                ]
            }
        },
        clean: {
            tmp: {
                src: ['tmp']
            },
            all: {
                src: ['dist', 'tmp']
            }
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
//    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('build', ['clean:all', 'transport', 'uglify', 'sass', 'imagemin', 'clean:tmp']);
};