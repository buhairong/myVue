import Vue from "vue";
//import VueRouter from "vue-router";
import VueRouter from "../myVue/myRouter";
import Home from "../views/Home.vue";

// 1. 为什么用 use 方法？ 他做了什么？
// VueRouter是插件，使用插件必须使用 use方法
// this.$router 可以访问 Router 实例，内部Vue.prototype.$router
// 实现并注册两个全局组件： router-link  router-view
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
