const webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: [path.join(__dirname, '/src/app/app.js')],
    devtool: 'eval',
    // output config
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'bundle.js', // Name of output file
        hash: true,
    },
    plugins: [
        // webpack 提供了 DefinePlugin 设置环境变量，后面会根据设置的不同环境变量决定是否打包压缩
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
        // 用来对js文件进行压缩，从而减小js文件的大小，加速load速度
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        // 自动生成页面
        new HtmlWebpackPlugin({
            inject: 'body',
            filename: 'index.html',
            hash: true,
            template: path.join(__dirname, '/src/app/index.html'),
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/, // All .js files
                loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
                exclude: [nodeModulesPath],
            },
        ],
    },
};

module.exports = config;
