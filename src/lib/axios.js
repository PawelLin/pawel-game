import Axios from 'axios'
// import router from '@/router'

Axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// Axios.defaults.timeout = 3000

// 添加请求拦截器
Axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.headers = {
    }
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    if (response.data.code && response.data.code !== '0000') {
        return Promise.reject(response.data)
    }
    return response
}, error => {
    // 对响应错误做点什么
    const { data } = error.response
    if (data.code === '6302') {
    }
    return Promise.reject(error)
})

export default Axios
