const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
    entry: {
        
        index: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].js?[chunkhash]',
        publicPath: publicPath
    },
    module: {
        rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    less: ExtractTextPlugin.extract({
                        use: ['css-loader', 'less-loader'],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }, 
        {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, 
        {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
        },
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    root: path.resolve(__dirname, 'src'),
                    attrs: ['img:src', 'link:href']
                }
            }]
        },
        {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader?limit=10000&name=/imgs/[name].[ext]'
            }]
        }]
    },
    plugins: [
        // 清除dist模块
        new CleanWebpackPlugin(['dist']),
        // 提取公共代码
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common']
        }),
        // 生成html的插件,引入css文件和js文件
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inlineSource: '.css',
            chunksSortMode: 'dependency'
        }),
        // /将js中引入的css分离为独立样式文件
        new ExtractTextPlugin("css/styles.css?[chunkhash]"),
        // 将页面的CSS内联到页面中
        new HtmlWebpackInlineSourcePlugin(),
        // 模块热替换
        // new webpack.HotModuleReplacementPlugin(),
        //压缩提取出的css，并解决ExtractTextPlugin分离出的重复问题(多个文件引入同一css文件)
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        })
    ],
    // 编译后的代码映射回原始代码
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 8010,
        // hot: true,
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
        // ,
        // historyApiFallback: {
        //     index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        // }
    }
})