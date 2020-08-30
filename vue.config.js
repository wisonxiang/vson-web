module.exports = {
    lintOnSave: false, // 取消 eslint 验证
    assetsDir:'static',
    publicPath: process.env === 'prodction'? 'http//cdn.vson.top':'/'
}