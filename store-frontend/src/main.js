import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import 'swiper/css/swiper.css'
import {MessageBox} from 'element-ui'
import * as api from '@/api'
import VueLazyload from 'vue-lazyload'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 引入 Mock 模拟数据，让 mockServe.js 执行一次
import mockServe from '@/mock/mockServe'

// 注册商品分类、轮播图、分页条为全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

// 图片懒加载插件
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/images/error.png'),
    loading: require('./assets/images/loading.gif'),
    attempt: 1
})
// 表单校验
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        // 修改内置规则的 message，让确认密码和密码相同
        is: (field) => `${field}必须与密码一致`
    },
    // 给校验的 field 属性名映射中文名称
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        rePassword: '确认密码',
        agree: '《用户协议》和《隐私政策》'
    }
})
// 自定义校验规则
VeeValidate.Validator.extend('agreePrivacy', {
    validate: value => {
        return value
    },
    getMessage: field => '同意' + field
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        // 装配全局事件总线
        Vue.prototype.$bus = this
        // 全局 api 对象管理
        Vue.prototype.$api = api
        // element-ui 组件按需引入
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
    }
}).$mount('#app')