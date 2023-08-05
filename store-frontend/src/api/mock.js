import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// axios 实例
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data;
}, (error) => {
    return Promise.reject(new Error('fail'))
})

export default requests