<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeResetModal')"
        />
      </div>
      <h2>Start over</h2>
      <p>Are you sure you want to delete this ticket and start over?</p>
      <div class="button-group">
        <button @click="resetTicket" class="blue-btn">Yes</button>
        <button @click="$store.commit('closeResetModal')" class="blue-btn">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetModal",
  methods: {
    resetTicket() {
      localStorage.removeItem("exitTicket");
      this.$store.commit("totalReset");
      this.$store.commit("activateEditor");
      this.$store.commit("closeResetModal");
    },
  },
};
</script>

<style scoped>
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
  justify-content: flex-start;
  align-items: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  width: 18em;
  height: 18em;
  background: #fcfcfc;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
}

.icon {
  padding-right: 1em;
  cursor: pointer;
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
