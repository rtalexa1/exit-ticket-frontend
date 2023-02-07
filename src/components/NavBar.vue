<template>
  <div class="nav-bar">
    <div class="spaceholder"></div>
    <div class="logo">
      <img
        src="../assets/images/Math-Exit-Ticket-1.jpg"
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
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NavBar",
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth);

      this.$store.commit("resetCurrentUser");
      this.$store.commit("resetCurrentTicket");
      this.$store.commit("clearExitTickets");
      this.$store.commit("activateEditor");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-bar {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: solid 2px;
  // border-color: black;
  width: 100%;
  height: 5.3em;
  background-color: #253c55;
  color: #f2f2f2;
}

.spaceholder {
  width: 2.5em;
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
</style>
