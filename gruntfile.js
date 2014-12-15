var fs     = require('fs');
var path   = require('path');
var assert = require('assert');

var emConverter = function(less, fontsize, basefontsize){
    if (less.tree.functions.ispixel(fontsize)){
        basefontsize = (basefontsize) ? basefontsize.value : 16
        return fontsize.value/basefontsize+'em';
    }
};

module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options : {
                    customFunctions : {
                        em: emConverter
                    }
                },
                files: {
                    'dist/css/bare.css' : 'src/main.less'
                }
            },
            dist: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 4,
                    customFunctions : {
                        em: emConverter
                    }
                },
                files: {
                    'dist/css/bare.min.css' : 'src/main.less'
                }
            }
        },

        watch : {
            styles: {
                files: ['src/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    //load
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-compile-handlebars');

    //register
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('watcher'  , ['watch']);
    grunt.registerTask('build'  , ['less']);
    //grunt.registerTask('assemble', ['compile-handlebars']);
};
