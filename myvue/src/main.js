import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router, // 设置router,它怎么起作用？
  store,
  render: h => h(App)
}).$mount("#app");
