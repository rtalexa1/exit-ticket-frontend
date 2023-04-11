<template>
  <div class="modal-backdrop">
    <div class="util-modal modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeCancelModal')"
        />
      </div>
      <h2>Cancel</h2>
      <p>
        Would you like to stop editing this ticket? Your changes will be lost.
      </p>
      <div class="button-group">
        <button @click="cancelTicket" class="blue-btn">Yes</button>
        <button @click="$store.commit('closeCancelModal')" class="blue-btn">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CancelModal",
  methods: {
    async cancelTicket() {
      if (this.isLoggedIn) {
        const url = new URL("http://localhost:3000");
        await fetch(
          `${url}/exit_tickets/${this.$store.state.ticketManager.currentTicket.id}`,
          // Edit production URL (no longer a nested route)
          // `https://exit-ticket-api.herokuapp.com/users/${this.$store.state.currentUser.id}/exit_tickets/${this.$store.state.currentTicket.id}`,
          { method: "DELETE" }
        );
      } else {
        localStorage.removeItem("exitTicket");
      }

      this.$store.commit("totalReset");
      this.$store.commit("closeCancelModal");
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style>
.util-modal {
  height: 12em;
  padding: 0 1em;
}

p {
  text-align: center;
}
</style>
