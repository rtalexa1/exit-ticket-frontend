<template>
  <NavBar />
  <div class="container">
    <ExitTicketSidebar />
    <div class="exit-ticket-container">
      <!-- On first render, users will see a (mostly) blank area with a prompt. -->
      <!-- They will be asked to choose an existing ticket from the sidebar, or to create a new one.  -->
      <!-- Should both views be located in the ExitTicketEditor, or should it be two separate components? -->
      <ExitTicketEditor />
    </div>
  </div>
  <Footer />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ExitTicketSidebar from "./components/ExitTicketSidebar.vue";
import ExitTicketEditor from "./components/ExitTicketEditor.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    NavBar,
    ExitTicketSidebar,
    ExitTicketEditor,
    Footer,
  },
  methods: {
    // Would it be better to create this method as an action somehow, since we
    // are ultimately committing the data to the store?
    async fetchExitTickets() {
      const res = await fetch("http://localhost:3000/users/1/exit_tickets/");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    const exitTickets = await this.fetchExitTickets();
    this.$store.commit("setExitTickets", exitTickets);
  },
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll;
  height: 100%;
}

ul {
  list-style: none;
  display: contents;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-height: 100%;
  background-color: #f2f2f2;
  // color: var(--color-text-body);
  line-height: 1.5;
  font-family: Calibri, "Gill Sans MT", "Gill Sans", "Trebuchet MS", sans-serif;
  // Geneva, Verdana, Tahoma, sans-serif;
}

.exit-ticket-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
