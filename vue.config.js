module.exports = {
    lintOnSave: false, // 取消 eslint 验证
    assetsDir:'static',
    publicPath: process.env === 'development'? '/':'//cdn.vson.top',
    productionSourceMap: false
}