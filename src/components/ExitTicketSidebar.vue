<template>
  <div class="sidebar" :class="{ toggled: toggle }">
    <div class="icon">
      <font-awesome-icon icon="fa-solid fa-bars" @click="onClick" />
    </div>
    <div v-show="toggle" class="sidebar-content">
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
      this.$store.commit("deactivateEditor");
    },
  },
  created() {
    this.$store.dispatch("fetchExitTickets");
  },
};
</script>

<style>
.icon {
  cursor: pointer;
}

.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 0 2px 0 2px;
  border-style: solid;
  height: 100vh;
  padding: 5em 1em 1em 1em;
  background-color: #fcfcfc;
}

.toggled {
  width: 12em;
}

.untoggled {
  width: 0.5em;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.exit-ticket-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
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
</style>
