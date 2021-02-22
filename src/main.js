import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
//导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
//导入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://vueshop.pixiv.download/api/private/v1/'
//把这个包挂载到Vue的原型对象上,每一个组件都可以通过this，访问到$http从而发起axios请求，直接this.$http
Vue.prototype.$http = axios





Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
