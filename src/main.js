import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

// Load JWT from local storage on refresh
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth-token");
  const authTokenExists = auth_token !== "undefined" && auth_token !== null;
  if (authTokenExists) {
    store.dispatch("loginUserWithToken", { auth_token });
    console.log("It's working!");
  }
}

library.add(faBars, faPlus, faX);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
