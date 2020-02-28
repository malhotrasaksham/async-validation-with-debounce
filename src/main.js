import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";

import axios from "axios";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
