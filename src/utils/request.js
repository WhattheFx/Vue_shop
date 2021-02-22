import axios from 'axios'

//配置请求的根路径
// axios.defaults.baseURL = 'https://api.naccl.top/vue/shop/api/private/v1/'
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    // baseURL: 'http://127.0.0.1:8081',
    baseURL: 'https://api.naccl.top/vue/shop/api/private/v1/',
    // request timeout
    timeout: 5000 
  })







export default service