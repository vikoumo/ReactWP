const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const node_env = process.env.NODE_ENV || 'development';
const config = {
  /**  
   * 单个入口写法 => entry : '....'
   * 入口文件(多个入口写法)
   * 数组 => 在你想要多个依赖文件一起注入，并且将它们的依赖导向(graph)到一个“chunk”时，传入数组的方式就很有用。所有文件会按顺序打包
   * entry: ['index1.js', 'index2.js]
   * 对象 => 多页应用，有多个html文件，然后你通过一个对象告诉Webpack为每一个html生成一个bundle文件。
   * entry: {
   *  page1: 'index1.js',
   *  page2: 'index2.js'
   * }
  */
  entry: [
    path.join(__dirname, '/src/www/index.js'),
  ],
  // 构建目录 =》输出文件的路径与名称（编译出来的东西放在哪里）
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出文件的保存路径
    publicPath: '/', // 被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值里面 eg:imgurl。
    filename: 'bundle.js', // 输出文件的名称
    /**
     * 多文件出口: filename: "[name].js"
     * 如果配置创建了多个单独的“chunk”，则应该使用占位符（替代）来确保每个文件具有唯一的名称。
     */
  },
  //通过将 mode 参数设置为 development, production 或 none，可以启用对应环境下 webpack 内置的优化。production会对代码压缩，其他不会
  mode: node_env,
  resolve: {
    // 扩展名
    extensions: ['.js', '.css', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // https://www.cnblogs.com/wangyingblog/p/7027540.html
  devtool: 'source-map',
  devServer: {
    contentBase: 'src/www', // 本地服务器在哪个目录搭建页面，一般我们在当前目录即可； =》www下面的文件都可以映射到根目录下面
    // node: {
    //     console: true,
    // },
    stats: "errors-only", //表示编译的时候shell上的输出内容只打印错误
    hot: true, 
    // 热替换 => 重新加载改变的部分。和inline一起开就是先重新加载改变的部分，HRM失败则刷新页面。=> 热替换的开关，是true了会去找HRM(HotModuleReplacementPlugin => 真正有局部热更新作用的插件)
    inline: true, // 热加载 => 刷新浏览器
    port: 9090, // Port Number
    host:'0.0.0.0', //此时localhost:9090和0.0.0.0:9090都能访问成功
    overlay: true,//这个配置属性用来在编译出错的时候，在浏览器页面上显示错误，默认是false，可设置为true
    https: true, // served over HTTP/2 with HTTPS
    historyApiFallback: true, // 当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
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
  // 插件可以用于执行范围更广的任务，插件的范围包括：打包优化、资源管理和注入环境变量。
  plugins: [
    // 在dist里生成h5页面
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      chunk: ['index'], // 如果是多入口，h5页面里面引用哪些js
      hash: true,
      template: path.join(__dirname, '/src/www/index.html'),
    }),
    // 真正有局部热更新作用的插件HRM
    new webpack.HotModuleReplacementPlugin(),
    // webpack 提供了 DefinePlugin 设置环境变量，后面会根据设置的不同环境变量决定是否打包压缩
    // definePlugin定义全局变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(node_env),
      },
    }),
  ],
  //loader 被用于转换某些类型的模块
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
      //排除掉
      exclude: [nodeModulesPath],
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
      // css-loader: 加载.css文件
      // style-loader:使用<style>将css-loader内部样式注入到我们的HTML页面
    },
    ],
  },
};
module.exports = config;
