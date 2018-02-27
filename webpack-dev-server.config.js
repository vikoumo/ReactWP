const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const config = {
  // 入口文件，数组中的所有文件会按顺序打包
  entry: [
    path.join(__dirname, '/src/www/index.js'),
  ],
  // 构建目录 =》输出文件的路径与名称（编译出来的东西放在哪里）
  output: {
    path: path.resolve(__dirname, 'build'), // 输出文件的保存路径
    publicPath: '/', // 网站运行时的访问路径
    filename: 'bundle.js', // 输出文件的名称
  },
  resolve: {
    // 扩展名
    extensions: ['.js', '.css', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devtool: 'eval',
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server =》www下面的文件都可以映射到根目录下面
    // devtool: 'eval', // source mapping style
    // node: {
    //     console: true,
    // },
    // debug: true,
    hot: true, // Live-reload
    inline: true, // Inline mode is recommended when using Hot Module Replacement.
    port: 9090, // Port Number
    https: true, // served over HTTP/2 with HTTPS
    host: 'localhost', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
    // proxy: {
    //     // 反向代理
    //     '/user': {
    //         target: 'http://localhost:9090',
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/user/': '/',
    //         },
    //         secure: false,
    //     },
    // },
  },
  plugins: [
    // 自动生成页面
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      chunk: ['index'], // 分片
      hash: true,
      template: path.join(__dirname, '/src/www/index.html'),
    }),
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      // 去监听以.jsx或者.js结尾的
      test: /(\.jsx|\.js)$/,
      // 加载器 React-hot loader
      loaders: ['react-hot-loader', 'babel-loader?cacheDirectory=true'],
      // query: {
      //     // babel
      //     presets: ['es2015', 'react'],
      // },
      exclude: [nodeModulesPath],
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
    },
    ],
  },
};
module.exports = config;
