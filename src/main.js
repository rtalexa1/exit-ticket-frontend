import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const firebaseConfig = {
  apiKey: "AIzaSyBPwsfdGzQ73nUuLkViabUD-RpAzmXmOmU",
  authDomain: "exit-ticket-d0384.firebaseapp.com",
  projectId: "exit-ticket-d0384",
  storageBucket: "exit-ticket-d0384.appspot.com",
  messagingSenderId: "422240912790",
  appId: "1:422240912790:web:8eb6462e0db21a6db7c9b7",
  measurementId: "G-RKGPC9QLN2",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

library.add(faBars, faPlus, faX);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
