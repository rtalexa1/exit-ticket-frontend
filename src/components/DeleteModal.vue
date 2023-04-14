<template>
  <div class="modal-backdrop">
    <div class="util-modal modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeDeleteModal')"
        />
      </div>
      <h2>Delete</h2>
      <p>Are you sure you want to delete this ticket?</p>
      <div class="button-group">
        <button @click="deleteTicket" class="blue-btn">Yes</button>
        <button @click="$store.commit('closeDeleteModal')" class="blue-btn">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  methods: {
    async deleteTicket() {
      await fetch(
        `https://exit-ticket-api.herokuapp.com/exit_tickets/${this.$store.state.ticketManager.currentTicket.id}`,
        { method: "DELETE" }
      );

      this.$store.commit("removeCurrentExitTicketFromCollection");
      this.$store.commit("resetCurrentTicket");
      this.$store.commit("resetCurrentTicketQuestions");
      this.$store.commit("closeDeleteModal");
      this.$store.commit("disableEditing");
      this.$store.commit("activateEditor");
    },
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

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 5px;
  width: 40%;
}
</style>
