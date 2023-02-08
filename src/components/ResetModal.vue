<template>
  <div class="modal-backdrop">
    <div class="util-modal modal">
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
