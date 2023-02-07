<template>
  <div class="sidebar">
    <!-- <div class="sidebar-icon">
      <font-awesome-icon icon="fa-solid fa-bars" @click="onClick" />
    </div> -->
    <div class="sidebar-content">
      <div v-if="$store.state.currentUser">
        <h4>Exit Tickets</h4>
        <div v-for="ticket in $store.state.exitTickets" :key="ticket.id">
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
          >
            Sign in
          </button>
        </p>
        <p>OR</p>
        <p>
          <button
            class="sign-in-register-btn"
            @click="$store.commit('openRegistrationModal')"
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
export default {
  name: "ExitTicketSidebar",
  data() {
    return {
      toggle: true,
    };
  },
  methods: {
    onClick() {
      this.toggle = !this.toggle;
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
      this.$store.dispatch("fetchTicketQuestions");
      this.$store.commit("deactivateEditor");
    },
  },
  created() {
    this.$store.dispatch("fetchExitTickets");
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
  margin-top: 5em;
  align-items: center;
  border-width: 0 2px 0 0;
  border-style: solid;
  width: 12em;
  height: 100vh;
  padding: 1em;
  background-color: #fcfcfc;
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
