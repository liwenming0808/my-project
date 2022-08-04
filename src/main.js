import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style/index.scss";
import i18n from "./assets/i18n/index";
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
