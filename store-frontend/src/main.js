import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// 注册商品分类导航为全局组件
import TypeNav from '@/components/TypeNav'
// 引入 Mock 模拟数据，让其执行一次
import mockServe from '@/mock/mockServe'
// 引入 swiper 轮播图样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav)

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        // 装配全局事件总线
        Vue.prototype.$bus = this
    }
}).$mount('#app')
