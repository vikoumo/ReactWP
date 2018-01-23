// require会把这个文件当做符合webpack标准的模块引用进来
const colors = require('./colors.js');
const yellow = colors[3];
// 不会污染全局环境，button.js没有被放到index.html里面。
// 这些变量或者函数只能在button里面看得到，除非被暴露出去。
// module.exports会把后面的当成一个组件暴露出去
module.exports = function(color, label) {
    color = color || yellow;
    label = label || 'button';
    const button = `<button style="color:${color}">${label}</button>`;
    // console.log(document.querySelector('#JS').childNodes);
    document.querySelector('#JS').childNodes[1].innerHTML = button;
};
