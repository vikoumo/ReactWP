sudo npm config set registry "https://registry.npm.taobao.org"
sudo npm i webpack -g
sudo npm i
cat > proxy.js << EFO
module.exports = {
    // target: 'https://pre-cms.test.meipu.cn/proxy',
    target: 'http://pre-cmsapi.test.meipu.cn/',
    // 厦门机器测试环境 172.16.28.3
    // target: 'http://cms.meitu-int.com',
    // 杭州机器测试环境 172.16.71.2
    // target: 'http://daily.cms.meipu.cn/proxy/',
    changeOrigin: true,
    pathRewrite: {
        '^/proxy/': '/',
    },
    secure: false,
};
EFO