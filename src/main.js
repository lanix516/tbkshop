import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Axios from "axios";
//Import FastClick
import FastClick from "fastclick";

FastClick.attach(document.body);
// Import Loading and stylesheet
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

//Import Toast
import { Toast } from "vant";
Vue.use(Toast);
import { List } from "vant";
Vue.use(List);
let test = true;
if (test) {
  Axios.defaults.baseURL = "/api";
} else {
  Axios.defaults.baseURL = "https://www.chengdongkeji.com/interface/";
}
Axios.defaults.headers = {
  "Content-Type": "multipart/form-data"
};
Vue.prototype.axios = Axios;

Vue.config.productionTip = false;
let user_str = localStorage.getItem("userInfo");
if (user_str) {
  let user = JSON.parse(user_str);
  store.commit("setUserInfo", user);
  store.commit("setLogin", true);
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
