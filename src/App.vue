<template>
  <!-- <NavBar style="position: absolute; top: 0" /> -->
  <nav>
    <div class="nav-bar">
      <div class="spaceholder"></div>
      <div class="logo">
        <img
          src="./assets/images/Math-Exit-Ticket-1.jpg"
          alt="logo"
          class="logo"
        />
      </div>
      <div class="user-display">
        <div class="loader" v-if="$store.state.loaderVisible"></div>
        <div
          v-else-if="$store.getters.isLoggedIn && !$store.state.loaderVisible"
        >
          <p>Signed in as {{ $store.state.sessionManager.user.email }}</p>
          <button class="sign-out-btn" @click="logOut">Logout</button>
        </div>
        <div v-else>
          <p>Not logged in</p>
          <p>
            <button
              class="sign-in-register-btn"
              @click="$store.commit('openSignInModal')"
            >
              Sign in
            </button>
          </p>
          <p>
            <button
              class="sign-in-register-btn"
              @click="$store.commit('openRegistrationModal')"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <ExitTicketSidebar />
    <SignInModal v-if="$store.state.modalManager.signInModalOpen" />
    <RegistrationModal v-if="$store.state.modalManager.registrationModalOpen" />
    <DeleteModal v-if="$store.state.modalManager.deleteModalOpen" />
    <ResetModal v-if="$store.state.modalManager.resetModalOpen" />
    <CancelModal v-if="$store.state.modalManager.cancelModalOpen" />
    <div v-if="$store.state.editorActive" class="exit-ticket-container">
      <ExitTicketEditor />
    </div>
    <div v-else class="exit-ticket-container">
      <ExitTicketDisplay />
    </div>
  </div>
  <footer>
    <span>Copyright 2023 RT Alexander</span> |
    <span>Contact: rtalexa1@gmail.com</span>
  </footer>
</template>

<script>
import SignInModal from "./components/SignInModal.vue";
import RegistrationModal from "./components/RegistrationModal.vue";
import DeleteModal from "./components/DeleteModal.vue";
import ResetModal from "./components/ResetModal.vue";
import CancelModal from "./components/CancelModal.vue";
import ExitTicketSidebar from "./components/ExitTicketSidebar.vue";
import ExitTicketEditor from "./components/ExitTicketEditor.vue";
import ExitTicketDisplay from "./components/ExitTicketDisplay.vue";
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SignInModal,
    RegistrationModal,
    DeleteModal,
    ResetModal,
    CancelModal,
    ExitTicketSidebar,
    ExitTicketEditor,
    ExitTicketDisplay,
  },
  methods: {
    logOut() {
      this.logOutUser();
      this.$store.commit("signOut");
    },
    ...mapActions(["loginWithUserToken", "logOutUser"]),
  },
  async mounted() {
    let localAuthToken = localStorage.auth_token;
    let cookieExists =
      localAuthToken !== "undefined" && localAuthToken !== null;
    if (cookieExists) {
      const auth_token = localStorage.getItem("auth_token");
      const authTokenExists = auth_token !== "undefined" && auth_token !== null;
      if (authTokenExists) {
        await this.$store.dispatch("loginWithUserToken", { auth_token });
      }
    }
  },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100%;
  background-color: #f2f2f2;
  font-size: large;
  line-height: 1.5;
  font-family: "Comfortaa", sans-serif;
}

@media (max-width: 768px) {
  body {
    font-size: medium;
  }
}

html {
  overflow-y: scroll;
  height: 100%;
}

ul {
  list-style: none;
  display: contents;
}

button {
  font-size: smaller;
  font-family: inherit;
}

input {
  font-size: smaller;
  font-family: inherit;
}

.nav-bar {
  // position: absolute;
  // top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: solid 2px;
  width: 100%;
  height: 5.3em;
  background-color: #253c55;
  color: #f2f2f2;
}

.spaceholder {
  width: 2.5em;
}
@media (max-width: 768px) {
  .spaceholder {
    width: 0em;
  }
}

.logo {
  position: relative;
  border-bottom: solid 2px;
  width: 8em;
  height: 5.3em;
}

.user-display {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #f2f2f2;
  font-size: medium;
  line-height: 1.2;
  text-align: center;
}

@media (max-width: 768px) {
  .user-display {
    font-size: small;
  }
}

.sign-out-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  color: #f2f2f2;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}

.sign-in-register-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  text-decoration: underline;
  cursor: pointer;
  font-size: medium;
  color: #f2f2f2;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-bottom: 16px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
}

@media (max-width: 1200px) {
  .container {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}

.exit-ticket-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
}

footer {
  position: relative;
  bottom: 0;
  border-top: solid 2px #f2f2f2fc;
  width: 100%;
  padding: 2px 10px;
  background: #404040;
  font-size: medium;
  text-align: center;
  color: #f2f2f2;
}
</style>
