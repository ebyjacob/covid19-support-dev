import Vue from 'vue'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import * as firebase from "firebase";
import * as config from "./config/config";
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueTableDynamic from 'vue-table-dynamic'


Vue.use(Vuelidate);
Vue.use(VueTableDynamic);

firebase.initializeApp(config.firebase_config);

firebase.auth().onAuthStateChanged(user => {
  let currentUser = firebase.auth().currentUser;
  if (currentUser) {
    currentUser.getIdTokenResult().then(idtoken => {
      if (idtoken && idtoken.claims) {
        user.admin = idtoken.claims.admin;
        user.moderator = idtoken.claims.moderator;
        user.verifiedvolunteer = idtoken.claims.verifiedvolunteer;
      }
      store.dispatch("fetchUser", user);
    });
  } else {
    store.dispatch("fetchUser", user);
  }
});

Vue.config.productionTip = false
Vue.use(BootstrapVue)

const db = firebase.firestore();
db.collection("application_settings")
    .doc("application_settings")
    .get()
    .then((docRef)=>{
        let appsettings = docRef.data();
        store.dispatch("updateApplicationSettings",appsettings);
        new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app')
    }).catch((ex)=>{
        console.log(ex);
    })
    