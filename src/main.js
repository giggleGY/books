// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import './assets/common.css'

import '../static/mui/css/mui.css';


import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mint-ui
Vue.use(mintui);

import './assets/rem.js'

import Common from './assets/utils.js'

Vue.use(Common);


Vue.config.productionTip = false


Vue.prototype.setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    console.log(exdate.setDate(exdate.getDate() + expiredays));
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  /*watch: {
      "$route": 'checkLogin'
  },
  created() {
      this.checkLogin();
  },
  methods: {
      checkLogin() {

          //检查是否存在session
          if (!this.getCookie('session')) {
              this.$router.push('/Mine/login');
          } else {
              console.log(2);
              this.$router.push('/Mine/Mine');
          }
      }
  }*/
})
