// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//axios网络请求
import axios from 'axios'
import qs from 'qs'
//vuex入口文件
import store from '@/vuex/store.js'
//重置浏览器基本样式
import '@/comment/css/reset.styl'
//饿了吗插件及其样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
//创建一个axios实例
var axios_instance = axios.create({
    //config里面有这个transformRquest，这个选项会在发送参数前进行处理。
    //这时候我们通过Qs.stringify转换为表单查询参数
    transformRequest: [function (data) {
        data = qs.stringify(data);
        return data;
    }],
    //设置Content-Type
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
})
Vue.prototype.$axios = axios_instance;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
