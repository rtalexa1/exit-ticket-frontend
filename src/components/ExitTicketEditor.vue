<template>
  <div class="editor-container">
    <div v-if="editing">
      <h1>Exit Ticket Editor Here</h1>
    </div>
    <div v-else-if="!editing && exitTickets.length < 1">
      <p>You do not have any exit tickets. Click the button to create one.</p>
      <button>Create ticket</button>
    </div>
    <div v-else>
      <p>
        Click on a ticket to view it, or click the button to create a new
        ticket.
      </p>
      <button>Create ticket</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExitTicketEditor",
  data() {
    return {
      editing: false,
      exitTickets: [],
    };
  },
};
</script>

<style scoped lang="scss">
.editor-container {
  padding: 5em 0 0 4em;
  height: 100%;
}
</style>
