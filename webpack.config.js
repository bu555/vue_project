//@目录划分,使用html插件
//html插件:可自动把构建好的js脚本引入到html中

var path = require("path");  //node的内置模块
var htmlWebpackPlugin = require("html-webpack-plugin");  //html插件

module.exports = {  // nodejs语法,暴露出去供使用
    //脚本输入(指定入口)
    entry: './src/js/main.js',   //所设置的入口文件  [entry:入口]
    // 输出
    output: {             //输出到哪里   [output:输出]   
        path: path.resolve(__dirname, "./dist"),  //絕對路径 目录名 绝对路径
        filename: "build.js"      //打包后的文件名 (输出到同级目录的build.js文件)
    },
    //plugins数组中用来添加插件
    //注:使用plugins前要先本地安装webpack
    /* 本地webpack：cnpm i webpack -D
       插件：cnpm i html-webpack-plugin -D
       依赖：cnpm i tapable webpack-sources ansi-regex json5 object-assign emojis-list -D */
    plugins: [
        new htmlWebpackPlugin({  //配置html的自动脚本注入(自动链入打包后的js文件)
            template: "./src/index.html",  //原来的html
            filename: 'index.html',  //注入后的文件名
            inject: 'body'   //设定js脚本注入到body中
        })
    ],

    module: {
        //用来扩展webpack,打包其他文件类型  [rules 设定,规定]
        rules: [
            {
                test: /\.css$/,  //匹配.css文件
                use: [
                    'style-loader',  // 打包样式文件的loader  [loader装载]
                    'css-loader'     //顺序:先下后上
                ]
            },
            ////注: 使用less-loader 要依赖less  (要先安装less)
            ////注: 使用sass-loader 要依赖node-sass  (要先安装node-sass)
            // {
            //     test:/\.less$/,  //匹配.less文件
            //     use:[
            //         'style-loader',
            //         'css-loader',
            //         'less-loader'
            //     ]
            // },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tpl$/,
                use: [
                    'html-loader'
                ]

            },
            {
                //替换文件的引用，小文件将以base64编码的形式和文件一起打包，可减少http请求
                //针对img和url背景图
                test: /\.(png|jpg|gif|ttf)$/,
                use: [
                    { loader: 'url-loader', options: { limit: 1024 } },  //limit设置的是大于1024byte(字节)的图片转成base64码
                    'image-webpack-loader'  //用于压缩图片
                ]
            },
            {
                //注:在子项目目录init y初始化,再安装loader到这个子项目目录
                test: /\.js$/,
                include: /src/, //包括src中的所有js文件
                exclude: /node_modules/,  //不包括node_modules目录
                use: {
                    loader: "babel-loader",
                    options: {
                        //配置要解析的语法规范
                        //依赖安装cnpm install babel-core babel-preset-es2015 babel-plugin-transform-runtime --save --dev
                        presets: ['es2015'],  //转es6
                        plugins: ['transform-runtime'] //依赖'transform-runtime' babel-core babel-preset-es2015插件
                    }
                }
            },
            {
                test: /\.vue$/,
                use: [
                    "vue-loader"
                ]
            }

        ]
    }
};

