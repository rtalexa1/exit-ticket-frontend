<template>
  <div class="display-container">
    <h1>{{ $store.state.currentTicket.title }}</h1>
  </div>
</template>

<script>
export default {
  name: "ExitTicketDisplay",
  data() {
    return {
      exitTicketQuestions: [],
    };
  },
  methods: {
    async fetchTicketQuestions() {
      const res = await fetch(
        `users/1/exit_tickets/${this.$store.state.currentTicket.id}`
      );
      const data = await res.json();
      console.log(data);
    },
  },
  async created() {
    await this.fetchTicketQuestions();
  },
};
</script>

<style scoped lang="scss">
.display-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  padding: 2em;
  width: 95%;
  height: auto;
  background-color: #fcfcfc;
}
</style>
