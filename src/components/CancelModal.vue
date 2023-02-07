<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeCancelModal')"
        />
      </div>
      <h2>Cancel</h2>
      <p>Do you want to stop editing this ticket and lose your changes?</p>
      <button @click="cancelTicket">Yes</button>
      <button @click="$store.commit('closeCancelModal')">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelModal",
  methods: {
    async cancelTicket() {
      await fetch(
        `http://localhost:3000/users/${this.$store.state.currentUser.id}/exit_tickets/${this.$store.state.currentTicket.id}`,
        { method: "DELETE" }
      );

      this.$store.commit("resetCurrentTicket");
      this.$store.commit("resetCurrentTicketQuestions");
      this.$store.commit("closeCancelModal");
      this.$store.commit("disableEditing");
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
