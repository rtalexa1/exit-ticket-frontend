<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeDeleteModal')"
        />
      </div>
      <h2>Delete</h2>
      <p>Are you sure you want to delete this ticket?</p>
      <button @click="deleteTicket">Yes</button>
      <button @click="$store.commit('closeDeleteModal')">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  methods: {
    async deleteTicket() {
      await fetch(
        `http://localhost:3000/users/${this.$store.state.currentUser.id}/exit_tickets/${this.$store.state.currentTicket.id}`,
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
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  width: 15em;
  height: 13em;
  background: #fcfcfc;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.icon {
  padding-right: 1em;
  cursor: pointer;
}

input {
  margin: 0.1em 0;
}
</style>
