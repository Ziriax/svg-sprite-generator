module.exports = function (grunt) {

    grunt.initConfig({
        babel: {
            options: {
                "sourceMap": false
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "src",
                    "src": ["**/*.js"],
                    "dest": "lib"
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask("default", ["babel"]);
};