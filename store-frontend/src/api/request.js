import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {guestUUID} from '@/utils/uuid'

// axios 实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // config 对象中包含 headers 请求头信息
    nprogress.start()
    // 临时用户的 UUID
    config.headers.userTempId = guestUUID()
    // 用户 token
    let token
    if ((token = localStorage.getItem('token')) || (token = sessionStorage.getItem('token'))) {
        config.headers.token = token
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data;
}, (error) => {
    return Promise.reject(error.message)
})

export default requests