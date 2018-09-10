// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'

Vue.use(ElementUI);

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios;

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://192.168.1.106/ZYJF/';
axios.defaults.baseURL = 'http://zyjf.nbzzjr.com/';

// 遍历路由name 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App),
  template: '<App/>'
})
