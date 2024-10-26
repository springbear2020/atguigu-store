const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    publicPath: "./",
    // 打包时不生成 map 文件
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/atguigu-store-frontend-api': {
                // TODO replace the request url
                target: 'http://gmall-h5-api.atguigu.cn/api',
                pathRewrite: { '^/atguigu-store-frontend-api': '' }
            }
        }
    }
})
