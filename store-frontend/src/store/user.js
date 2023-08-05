import {reqGetVerifyCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from '@/api'

const successCode = 200

const state = {
    code: '',
    userToken: '',
    userInfo: {}
}

const mutations = {
    GETVERIFYCODE(state, data) {
        state.code = data
    },
    USERLOGIN(state, data) {
        state.userToken = data
    },
    USERINFO(state, data) {
        state.userInfo = data
    },
    USERLOGOUT(state) {
        state.userInfo = {}
        state.userToken = ''
    }
}

const actions = {
    // 获取验证码
    async getVerifyCode({commit}, {phone}) {
        let result = await reqGetVerifyCode(phone);
        if (result.code === successCode) {
            commit('GETVERIFYCODE', result.data)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({commit}, {user}) {
        let result = await reqUserRegister(user);
        if (result.code === successCode) {
            return 'success'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户登录
    async userLogin({commit}, {user, rememberMe}) {
        let result = await reqUserLogin(user);
        if (result.code === successCode) {
            if (rememberMe) {
                localStorage.setItem('token', result.data.token)
            } else {
                sessionStorage.setItem('token', result.data.token)
            }
            commit('USERLOGIN', result.data.token)
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo();
        if (result.code === successCode) {
            commit('USERINFO', result.data)
        } else {
            return 'invalid user token'
        }
    },
    // 退出登录
    async userLogout({commit}) {
        let result = await reqLogout();
        if (result.code === successCode) {
            // 清除 token 信息
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            // 清除用户信息
            commit('USERLOGOUT')
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}