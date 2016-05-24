module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: 'client/scripts/**/*.js'
        },
        watch: {
            client : {
                files: ['client/scripts/**/*.js',
                    'client/views/**/*.html',
                    'client/styles/**/*.scss'
                ],
                tasks: ['jshint', 'uglify','copy','sass'],
                options: {
                    spawn: false
                }
            }
        },
        uglify: {
            build: {
                src: [
                    'client/scripts/client.js',
                    'client/scripts/controllers/*.js',
                    'client/scripts/factories/*.js'
                ],
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },
        sass: {
            dist: {
                files: {
                    'server/public/assets/styles/style.css': 'client/styles/style.scss'
                }
            }
        },
        //cssmin: {
        //    target: {
        //        files: [{
        //            expand: true,
        //            cwd: 'client/styles',
        //            src: '*.css',
        //            dest: 'server/public/assets/styles/',
        //            ext: '.min.css'
        //        }]
        //    }
        //},
        copy: {
            angular: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "angular/*.js",
                    "angular/*.map",
                    "angular-animate/*.js",
                    "angular-animate/*.map",
                    "angular-aria/*.js",
                    "angular-material/*.js",
                    "angular-messages/*.js",
                    "angular-route/*.js",
                    "angular-route/*.map",
                    "angular-ui-bootstrap/dist/*.js",
                    "angular-ui-bootstrap/dist/*.css",
                    "angular-smart-table/dist/*.js",
                    "angular-smart-table/dist/*.map"
                ],
                "dest": "server/public/assets/vendors/"
            },
            html: {
                expand: true,
                cwd: 'client/views/',
                src: [
                    "index.html",
                    "routes/*.html",
                    "partials/*.html",
                    "templates/*.html"
                ],
                "dest": "server/public/assets/views/"
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules/bootstrap/",
                src: [
                    "dist/**/*"
                ],
                "dest": "server/public/assets/vendors/bootstrap/"
            }
            //amCharts: {
            //    expand: true,
            //    cwd: "node_modules/amcharts3/",
            //    src: [
            //        "amcharts/**/*"
            //    ],
            //    "dest": "server/public/assets/vendors/"
            //},
            //dateUtils: {
            //    expand: true,
            //    cwd: "node_modules/",
            //    src: [
            //        "date-utils/lib/date-utils.min.js"
            //    ],
            //    "dest": "server/public/assets/vendors/"
            //}
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['copy', 'jshint', 'uglify','sass']);
};
