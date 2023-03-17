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
        <div v-if="$store.state.currentUser">
          <p>Signed in as {{ $store.state.currentUser.email }}</p>
          <button class="sign-out-btn" @click="signOut">Sign out</button>
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
    <!-- Todo: Refactor this code (and any other code) for just the one modal -->
    <!-- With that, we need to refactor the store -->
    <SessionManagerModal v-if="$store.state.signInModalOpen" />
    <SessionManagerModal v-if="$store.state.registrationModalOpen" />
    <DeleteModal v-if="$store.state.deleteModalOpen" />
    <ResetModal v-if="$store.state.resetModalOpen" />
    <CancelModal v-if="$store.state.cancelModalOpen" />
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
import SessionManagerModal from "./components/SessionManagerModal.vue";
import DeleteModal from "./components/DeleteModal.vue";
import ResetModal from "./components/ResetModal.vue";
import CancelModal from "./components/CancelModal.vue";
import ExitTicketSidebar from "./components/ExitTicketSidebar.vue";
import ExitTicketEditor from "./components/ExitTicketEditor.vue";
import ExitTicketDisplay from "./components/ExitTicketDisplay.vue";

export default {
  components: {
    SessionManagerModal,
    DeleteModal,
    ResetModal,
    CancelModal,
    ExitTicketSidebar,
    ExitTicketEditor,
    ExitTicketDisplay,
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
  align-items: space-around;
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
