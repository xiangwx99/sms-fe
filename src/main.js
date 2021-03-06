import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "assets/iconfont/iconfont.css";
import i18n from "./i18n";
import echarts from "echarts";
import htmlToPdf from "./function/htmlToPdf";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(htmlToPdf);
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
