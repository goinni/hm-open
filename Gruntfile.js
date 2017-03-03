/**
 * @since 2016-08-10 21:43
 * @author Jerry.hou
 */
module.exports = function(grunt){

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        /**
         * 基础配制信息
         */
        config: {
          folder: 'release',
          ip: 'http://127.0.0.1',
          port: 8888,
          livereload: 35740
        },
        /**
         * 版权信息
         */
        banner: '/** \n * <%= pkg.name %> - v<%= pkg.version %> \n' +
                ' * Create Date -<%= grunt.template.today("yyyy-mm-dd HH:MM:dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
        /**
         * less文件编译
         */
        less: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/assets',
                    src: ['**/*.less'],
                    dest: '<%= config.folder %>/assets/',
                    ext: '.css'
                }]
            }
        },
        /**
         * css 压缩
         */
        cssmin: {
            dev: {
                options: {
                    banner: '<%= banner %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.folder %>/assets/css/',
                    src: '*.css',
                    dest: '<%= config.folder %>/assets/css/'
                }]
            }
        },
        /**
         * 处理浏览器兼容
         */
        autoprefixer: {
            dev: {
                options: {
                    browsers: [
                        'last 2 version', 'Firefox >= 20', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.folder %>/assets/css/',
                    src: '*.css',
                    dest: '<%= config.folder %>/assets/css/'
                }]
            }
        },
        /**
         * 合并文件
         */
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>',
            },
            js: {
                src: [
                        'lib/jquery/dist/jquery.min.js', 
                        'lib/artTemplate/dist/template-native.js'
                    ],
                dest: '<%= config.folder %>/script/base.js'
            },
            css: {
                src: [
                        'lib/animate.css/animate.min.css', 
                        // 'lib/font-awesome/css/font-awesome.min.css'
                    ],
                dest: '<%= config.folder %>/assets/css/base.css'
            }
        },
        /**
         * JS 压缩
         */
        uglify: {
            options: {
                mangle: true,//{ except: ['jQuery', 'Backbone', '_', 'Cdss'] }
                banner: '<%= banner %>'
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/script/',
                    src: '*.js',
                    dest: '<%= config.folder %>/script/'
                }]
            }
        },

        /**
         * html文件压缩
         */
        htmlmin: {             
            dev: {                              
                options: {                       
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/tpl',
                    src: '**/*.html',
                    dest: '<%= config.folder %>/tpl'
                }]
            }
        },

        /**
         * html to js 转换器
         */
        htmlConvert: {
            options: {
                base:'<%= config.folder %>',
                rename:function (moduleName) {
                    return moduleName.replace('.html', '');
                }
            },
            iTemplates: {
                src: ['<%= config.folder %>/tpl/*.html'],
                dest: '<%= config.folder %>/script/templates.js'
            }
        },
        /**
         * 静态文件服务器
         */
        connect: {
            server: {
                options: {
                    // 经过测试 connect插件会依照base的定义顺序检索文件
                    // 这意味着如果存在相同文件，定义在前面的会优先返回
                    base: ['<%= config.folder %>', '.'],
                    port: '<%= config.port %>',
                    open: '<%= config.ip+ ":" +config.port %>/',
                    livereload: '<%= config.livereload%>',
                    hostname: '*',
                    middleware: function(connect, options, middlewares) {
                        // inject a custom middleware into the array of default middlewares 
                        middlewares.unshift(function(req, res, next) {
                        // if (req.url !== '/hello/world') return next();
                        // res.end('Hello, world from port #' + options.port + '!');
                            return next();
                        });
                      return middlewares;
                    }
                }
            }
        },
        /**
         * 复制
         */
        copy: {
            images: {
                    expand: true,
                    cwd: 'app/assets/images',
                    flatten: true,
                    src: '**/*',
                    dest: '<%= config.folder %>/assets/images/'
                },
            mockdata: {
                    expand: true,
                    cwd: 'app/mockdata',
                    flatten: true,
                    src: '**/*',
                    dest: '<%= config.folder %>/mockdata'
                },
            pages: {
                    expand: true,
                    cwd: 'app/pages',
                    src: '**/*',
                    dest: '<%= config.folder %>/'
                },
            js: {
                    expand: true,
                    cwd: 'app/script',
                    src: '**/*',
                    dest: '<%= config.folder %>/script'
                }
        },
        /**
         * 监听Task改变并执行对应的Task
         */
        watch: {
            options: {
                livereload: '<%= config.livereload%>'
            },
            css: {
                files: "app/assets/css/**/*",
                tasks: ["less", "autoprefixer"]
            },
            tpl: {
                files: "app/tpl/**/*",
                tasks: ["htmlmin","htmlConvert"]
            },
            script: {
                files: "app/script/**/*",
                tasks: ["copy:js"]
            },
            mockdata: {
                files: "app/mockdata/**/*",
                tasks: ["copy:mockdata"]
            },
            images: {
                files: "app/assets/images/**/*",
                tasks: ["copy:images"]
            },
            pages: {
                files: "app/pages/*",
                tasks: ["copy:pages"]
            }
        },
        /**
         *  清理目录
         */
        clean: {
            dev:['<%= config.folder %>']
        }
    });
    /**
     * 开发模式
     */
    grunt.registerTask('default', function () {
        grunt.task.run(['clean', 
            'copy:images', 
            'copy:mockdata', 
            'copy:pages', 
            'copy:js', 
            'less', 
            'autoprefixer', 
            'concat:js', 
            'htmlmin', 
            'htmlConvert', 
            'connect:server', 
            'watch']);
    });

    /**
     * 打包上线
     */
    grunt.registerTask('release', function () {
        grunt.task.run(['clean', 
            'copy:images', 
            'copy:mockdata', 
            'copy:pages', 
            'less', 
            'cssmin', 
            'autoprefixer', 
            'concat:js', 
            'uglify', 
            'htmlmin', 
            'htmlConvert']);
    });
}
