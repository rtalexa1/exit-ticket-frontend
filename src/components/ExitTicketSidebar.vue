<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="loader" v-if="$store.state.loaderVisible"></div>
      <div v-else-if="isLoggedIn && !$store.state.loaderVisible">
        <h4>Exit Tickets</h4>
        <div
          v-for="ticket in $store.state.ticketManager.exitTickets"
          :key="ticket.id"
        >
          <button
            @click="displayTicket"
            class="exit-ticket-btn"
            :value="ticket.id"
          >
            {{ ticket.title }}
            <br />
          </button>
        </div>
        <button @click="createNewTicket" class="blue-btn">
          Create a new exit ticket
        </button>
      </div>
      <div v-else class="prompt">
        <p>
          <button
            class="sign-in-register-btn"
            @click="$store.commit('openSignInModal')"
            style="color: #253c55"
          >
            Sign in
          </button>
        </p>
        <p>OR</p>
        <p>
          <button
            class="sign-in-register-btn"
            @click="$store.commit('openRegistrationModal')"
            style="color: #253c55"
          >
            Create an account
          </button>
        </p>
        <p>to save your exit tickets</p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExitTicketSidebar",
  methods: {
    test() {
      this.$store.commit("testToggle");
      console.log(this.$store.state.ticketManager.test);
    },
    createNewTicket() {
      this.$store.commit("startEditingNewTicket");
    },
    displayTicket(e) {
      const ticket = this.$store.state.exitTickets.find(
        (ticket) => ticket.id == e.target.value
      );
      this.$store.commit("setCurrentTicket", ticket);
      this.$store.commit("resetCurrentTicketQuestions");
      this.fetchTicketQuestions;
      this.$store.commit("deactivateEditor");
    },
    ...mapActions(["fetchTicketQuestions"]),
  },
  updated() {
    if (this.isLoggedIn && !this.anyExitTickets) {
      this.$store.dispatch("fetchExitTickets");
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "anyExitTickets"]),
  },
};
</script>

<style>
.sidebar-icon {
  cursor: pointer;
}

.sidebar {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 1em;
  align-items: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  padding: 2em;
  width: 12em;
  height: auto;
  padding: 1em;
  background-color: #fcfcfc;
}

@media (max-width: 1200px) {
  .sidebar {
    margin-left: 0;
    width: 95%;
  }
}

/* .toggled {
  width: 12em;
}

.untoggled {
  width: 0.5em;
} */

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  text-align: center;
}

.exit-ticket-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
}

.blue-btn {
  margin-top: 3px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid;
  border-radius: 5px;
  padding: 0.4em;
  background-color: #253c55;
  color: #f2f2f2;
  cursor: pointer;
}

.prompt {
  margin-top: 1em;
  text-align: center;
}

.sign-in-register-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  color: #253c55;
}
</style>
