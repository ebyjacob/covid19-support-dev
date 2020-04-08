const { 
    VUE_APP_FIREBASE_apiKey,
    VUE_APP_FIREBASE_authDomain,
    VUE_APP_FIREBASE_databaseURL,
    VUE_APP_FIREBASE_projectId
} = process.env;

export const superadmins = [ 'yesoreyeram@gmail.com' , 'masteruser@covid19-support-dev.web.app', 'superadmin@covid19-support-dev.web.app' ];

export const firebase_config = {
<<<<<<< HEAD
    apiKey: "AIzaSyCtbGvi1pBsIby5F1Y8WIT_Em8AOdv_0Ts",
    authDomain: "covid19-support-dev-eby.firebaseapp.com",
    databaseURL: "https://covid19-support-dev-eby.firebaseio.com",
    projectId: "covid19-support-dev-eby",
=======
    apiKey: VUE_APP_FIREBASE_apiKey,
    authDomain: VUE_APP_FIREBASE_authDomain,
    databaseURL: VUE_APP_FIREBASE_databaseURL,
    projectId: VUE_APP_FIREBASE_projectId,
>>>>>>> f654c2ba0bd3fb0675ebb15eac4e64a9addca58d
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};