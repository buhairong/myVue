import Vue from "vue";
//import VueRouter from "vue-router";
import VueRouter from "../myvue/myrouter/router.js";
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
    component: Home,
    beforeEnter(from, to, next) {
      console.log(`beforeEnter from ${from} to ${to}`)
      setTimeout(() => {
        next()
      }, 2000)
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    children: [
      {
        path: '/about/info',
        component: { render(h) { return h('div', 'info page') } }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
