<template>
  <NavBar />
  <div class="container">
    <ExitTicketSidebar />
    <SignInModal v-if="$store.state.signInModalOpen" />
    <RegistrationModal v-if="$store.state.registrationModalOpen" />
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
  <Footer />
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from "./components/NavBar.vue";
import RegistrationModal from "./components/RegistrationModal.vue";
import SignInModal from "./components/SignInModal.vue";
import DeleteModal from "./components/DeleteModal.vue";
import ResetModal from "./components/ResetModal.vue";
import CancelModal from "./components/CancelModal.vue";
import ExitTicketSidebar from "./components/ExitTicketSidebar.vue";
import ExitTicketEditor from "./components/ExitTicketEditor.vue";
import ExitTicketDisplay from "./components/ExitTicketDisplay.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    NavBar,
    RegistrationModal,
    SignInModal,
    DeleteModal,
    ResetModal,
    CancelModal,
    ExitTicketSidebar,
    ExitTicketEditor,
    ExitTicketDisplay,
    Footer,
  },
  onMounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch("fetchExitTickets");
      }
    });
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

.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  min-height: 35em;
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
</style>
