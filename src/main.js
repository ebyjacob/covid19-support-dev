import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import * as firebase from "firebase";
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

const configOptions = {
  apiKey: "AIzaSyCVSv4vUrvdVXI6ZG-M-ec-OKMcGJbXLuU",
  authDomain: "covid19-support-dev.firebaseapp.com",
  databaseURL: "https://covid19-support-dev.firebaseio.com",
  projectId: "covid19-support-dev",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
