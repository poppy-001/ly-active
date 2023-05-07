import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 引入外部css文件

// 重置样式
import "@/assets/css/normalize.css";

// iconfont
import "./assets/fonts/iconfont.css";

// 引入eleui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 全局样式
import "@/assets/css/global.css";

//swiper
import '@/assets/css/swiper-bundle.min.css'


new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount("#app");
