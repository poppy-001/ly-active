import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import { Message } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "login",

    meta: { index: 3 },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/LoginView.vue"),
  },
  {
    path: "/index",
    name: "index",

    meta: { index: 2 },
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index/indexView.vue"),
  },
  {
    path: "/activities",
    name: "activities",

    meta: { index: 1 },
    component: () =>
      import(
        /* webpackChunkName: "activities" */ "../views/activities/activitiesView.vue"
      ),
  },
  {
    path: "/person",
    name: "personView",
    meta: { index: 0 },
    component: () =>
      import(/* webpackChunkName: "person" */ "@/views/person/personView.vue"),
    key: "personView",
    children: [
      {
        path: "person",
        name: "person",
        meta: { index: -1 },
        component: () =>
          import("@/views/person/cpn/person.vue"),
        key: "person" // 给组件添加 key 属性
      },
      {
        path: "collectList",
        name: "collectList",
        meta: { index: -1 },
        component: () =>
          import(
            "../views/person/cpn/collectList"
          ),
        key: "collectList" // 给组件添加 key 属性
      },
      {
        path: "myActive",
        name: "myActive",
        meta: { index: -1 },
        component: () =>
          import("../views/person/cpn/myActive"),
        key: "myActive" // 给组件添加 key 属性
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("to.meta.index=====", to);
  // console.log("from.meta.index=====", from.meta.index);
  if (to.meta.index > from.meta.index) {
    //设置动画名称
    store.state.transitionName = 'slide-left';
  } else {
    store.state.transitionName = 'slide-right';
  }

  if (to.meta.index == -1) {
    next()
  }

  if (to.path == "/person") {
    if (localStorage.getItem("TOKEN")) {
      if (from.meta.index !== -1) {
        store.state.changePage = true

        setTimeout(() => {
          store.state.changePage = false
        }, 3000);
        setTimeout(() => {
          next();
        }, 1500);
      } else {
        next();
      }
    } else {
      store.state.changePage = false
      Message.warning({
        message: "您还未登录哦，请先登录",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  } else {
    if (to.path == "/login" || to.path == "/index" || to.path == "/activities") {
      store.state.changePage = true

      setTimeout(() => {
        store.state.changePage = false

      }, 3000);
      setTimeout(() => {
        next();
      }, 1500);
    }
  }
});


export default router;
