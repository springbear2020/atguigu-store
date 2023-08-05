import Vue from 'vue'
import VueRouter from 'vue-router'

/*
 * 重写 VueRouter 原型类的 push 方法，解决编程式路由导航连续多次跳转相同路由导致的 NavigationDuplicated 警告错误
 */
// 保存 VueRouter 原始方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写 push 方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写 replace 方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: '/home',
            component: () => import('@/views/home/Home'),
            meta: { footerShow: true }
        },
        {
            path: '/search/:keyword?',
            component: () => import('@/views/search/Search'),
            name: 'Search',
            meta: { footerShow: true }
        },
        {
            path: '/login',
            component: () => import('@/views/user/Login'),
            meta: { footerShow: false }
        },
        {
            path: '/register',
            component: () => import('@/views/user/Register'),
            meta: { footerShow: false }
        }
    ]
})

