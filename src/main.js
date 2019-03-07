import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import Axios from "axios";

// Import Loading and stylesheet
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

//Import Toast
import { Toast } from "vant";
Vue.use(Toast);
import { List } from "vant";
Vue.use(List);

Axios.defaults.baseURL = "https://www.chengdongkeji.com/";
//Axios.defaults.baseURL = "/api";
Axios.defaults.headers = {
  "Content-Type": "multipart/form-data"
};
Vue.prototype.axios = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
