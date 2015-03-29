module.exports = (grunt)->
    grunt.initConfig
        watch:
            compile:
                files: ['src/sass/**/*.sass']
                options:
                    spawn: false
                tasks: 'sass'
        sass:
            dist:
                files: [
                    expand: true
                    cwd: 'src/sass/'
                    src: '**/*.sass'
                    dest: 'bin/css'
                    ext: '.css'
                ]

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-sass'

    grunt.registerTask 'default', 'watch'

