import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "assets/iconfont/iconfont.css";
import i18n from "./i18n";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$EventBus = new Vue();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
