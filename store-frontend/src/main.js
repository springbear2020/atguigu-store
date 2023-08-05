import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// 注册商品分类导航为全局组件
import TypeNav from '@/components/TypeNav'


Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
