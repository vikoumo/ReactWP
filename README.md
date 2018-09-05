#webpack
## devDependencies
编译时运行与仅开发环境需要的东西放dev

## dependencies
生产环境用到的



#babel
## babel原理 =>
一个app.js文件，运行webpack，webpack通过配置找到处理.js类型的loader，就是配置的babel-loader，
然后loader把webpack交给他的文件转交给core去处理，core开始分析代码，解析语法树，把结果交给所有配置的插件，
最后所有的插件都处理完了之后，再把处理完的代码交还给loader，再交还给webpack，webpack再去找下一个loader,顺序是从右到左

## babel组成
> *  babel-loader: 负责 es6 语法转化
> *  babel-core: 提供一系列api。当webpack使用babel-loader处理文件时，babel-loader实际上调用了babel-core的api
> *  babel-preset-env: 包含 es6、7 等版本的语法转化规则
> *  babel-polyfill: es6 内置方法和函数转化垫片
> *  babel-plugin-transform-runtime: 避免 polyfill 污染全局变量