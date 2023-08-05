const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    // 打包时不生成 map 文件
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            '/api': {
                // TODO replace the request url
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' }
            }
        }
    }
})
