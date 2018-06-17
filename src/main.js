import "./global";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import Axios from "./utils/diyaxios";

// 路由
import router from "./router";
// VUEX
import store from "./store";
// MuseUI
import MuseUI from "muse-ui";

import "./assets/css/swiper.css";

// 自定义主题
import "./assets/theme.less";

// import 'babel-polyfill'; //解决ie浏览器不支持promise
import "./utils/rem";
// 全局css
import "./assets/css/base.css";
// import "./assets/css/mescroll.min.css";
import "./assets/css/base.less";
import "muse-ui/dist/muse-ui.css";
import { getPublicImg } from "@/utils";

// import "./assets/js/mescroll.min.js";
// import "./assets/js/pdlist1.js";
// import "./assets/js/vue.min.js";

//touch
import vueTouch from "vue-plugin-touch";
Vue.use(vueTouch);
//var VConsole = require('vconsole')
//new VConsole()
//手机端点击缓慢问题
//import fastclick from "fastclick";
//fastclick.attach(document.body);
// import jsonp from 'jsonp'

Vue.use(MuseUI);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
// Axios.jsonp = jsonp

Vue.prototype.$getPublicImg = path => {
  return getPublicImg(path);
};

Vue.prototype.$platform = window.is_gd_ali();

router.beforeEach((to, from, next) => {
  if (!to.query.promotionId) {
    if (
      sessionStorage.getItem("promotionId") &&
      (!sessionStorage.getItem("im_token") ||
        sessionStorage.getItem("im_realname") == "游客")
    ) {
      next({
        path: to.path,
        query: {
          promotionId: sessionStorage.getItem("promotionId")
        }
      });
    } else {
      next();
    }
  } else {
    // 参数上面有推广链接,用户已经登陆
    if (sessionStorage.getItem("im_token")) {
      // 用户试玩
      if (sessionStorage.getItem("im_realname" == "游客")) {
        next({
          path: to.path,
          query: {
            promotionId: to.query.promotionId
          }
        });
      } else {
        // 用户真实登陆
        next();
      }
    } else {
      // 用户未登录
      next();
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
