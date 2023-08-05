import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import api from '@/api' // global api management

import CategorySelection from '@/components/CategorySelection'

Vue.use(ElementUI)   // Vue.use(ElementUI, { locale })

Vue.component(CategorySelection.name, CategorySelection)  // global component

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$api = api
  }
})
