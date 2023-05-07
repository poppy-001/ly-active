import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false, // 加载状态的loading状态
    isLogin: false,
    changePage: false,
    transitionName: "" ,//存储用户登录状态
    activeList:[] //储存所有活动
  },
  getters: {},
  mutations: {
    CHANGELOGIN(ministate, val) {
      ministate.isLogin = val;
    },
  },
  actions: {
    checkToken(cxt) {
      if (localStorage.getItem("TOKEN")) {
        cxt.commit("CHANGELOGIN", true);
      } else {
        cxt.commit("CHANGELOGIN", false);
      }
    },
  },
  modules: {},
});
