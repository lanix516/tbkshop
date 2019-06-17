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
import { Toast, Dialog, List } from "vant";
Vue.use(Toast);
Vue.use(List);
Vue.use(Dialog);

let test = false;
if (test) {
  Axios.defaults.baseURL = "/api";
} else {
  Axios.defaults.baseURL = "https://www.ddyfl.com/interface/";
}
Axios.defaults.headers = {
  "Content-Type": "multipart/form-data"
};

Vue.config.productionTip = false;
let user_str = localStorage.getItem("userInfo");
if (user_str) {
  let user = JSON.parse(user_str);
  store.commit("setUserInfo", user);
  store.commit("setLogin", true);
  Axios.defaults.headers.AuthUserId = user.uid;
}
Vue.prototype.axios = Axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
