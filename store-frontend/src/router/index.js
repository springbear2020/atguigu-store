import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

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
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}
// 重写 replace 方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}

Vue.use(VueRouter)

let router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: '/home',
            component: () => import('@/views/home/Home'),
            meta: {footerShow: true}
        },
        {
            path: '/search/:keyword?',
            component: () => import('@/views/search/Search'),
            name: 'Search',
            meta: {footerShow: false}
        },
        {
            path: '/detail/:skuId',
            component: () => import('@/views/detail/Detail'),
            meta: {footerShow: false}
        },
        {
            path: '/cart',
            component: () => import('@/views/cart/Cart'),
            meta: {footerShow: false}
        },
        {
            path: '/cart/success',
            component: () => import('@/views/cart/CartSuccess'),
            meta: {footerShow: false}
        },
        {
            path: '/login',
            component: () => import('@/views/user/Login'),
            meta: {footerShow: false}
        },
        {
            path: '/register',
            component: () => import('@/views/user/Register'),
            meta: {footerShow: false}
        },
        {
            path: '/order/trade',
            component: () => import('@/views/order/Trade'),
            meta: {footerShow: false},
            beforeEnter(to, from, next) {
                // 只能从购物车【结算】进入订单交易页
                if (from.path === '/cart') {
                    next()
                }
                next(false)
            }
        },
        {
            path: '/order/pay',
            component: () => import('@/views/order/Pay'),
            meta: {footerShow: false},
            beforeEnter(to, from, next) {
                // 只能从交易页【支付】进入支付页
                if (from.path === '/order/trade') {
                    next()
                }
                next(false)
            }
        },
        {
            path: '/order/pay/success',
            component: () => import('@/views/order/PaySuccess'),
            meta: {footerShow: false},
            beforeEnter(to, from, next) {
                // 只能从支付页进入支付成功页
                if (from.path === '/order/pay') {
                    next()
                }
                next(false)
            }
        },
        {
            path: '/order/personal',
            component: () => import('@/views/order/person/Personal'),
            meta: {footerShow: false},
            redirect: '/order/personal/mine',
            children: [
                {
                    path: '/order/personal/mine',
                    component: () => import('@/views/order/person/MyOrder'),
                },
                {
                    path: '/order/personal/group',
                    component: () => import('@/views/order/person/GroupOrder'),
                }
            ]
        },
    ],
    // 路由切换时回到最顶部
    scrollBehavior() {
        return {y: 0}
    }
})

// 全局前置路由守卫：在路由发生变化时执行
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.userToken
    let uid = store.state.user.userInfo.id

    // 已登录
    if (token) {
        // 用户已登录仍想跳转到【注册】和【登录】
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        }

        // 是否已根据 token 查询过用户信息
        if (!uid) {
            try {
                // 派发 action 获取用户信息并放行
                await store.dispatch('getUserInfo')
                next()
            } catch (e) {
                // token 失效，清除登录信息，重新登录
                await store.dispatch('userLogout')
                next('/login?redirect=' + to.path)
            }
        }

        // 已登录，其它情况一律放行
        next();
    } else {
        // 未登录，不能查看订单相关（/order/trade、/order/pay、/order/pay/success、/order/personal）
        if (to.path.indexOf('order') !== -1) {
            next('/login?redirect=' + to.path)
        }

        // 未登录，其它情况一律放行
        next()
    }
})

export default router