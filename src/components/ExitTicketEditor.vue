<template>
  <div class="editor-container">
    <div v-if="$store.state.editing" class="ticket-creator-container">
      <h1>Create a Ticket</h1>
      <form
        v-show="
          $store.state.editing && !$store.state.ticketManager.exitTicketCreated
        "
        @submit.prevent
        class="ticket-creator-form"
      >
        <label for="title">Give your exit ticket a title</label>
        <input
          :disabled="$store.state.ticketManager.exitTicketCreated"
          id="title"
          type="text"
          name="title"
          v-model="title"
        />
        <label for="grade-level">Select your grade level</label>
        <select
          :disabled="$store.state.ticketManager.exitTicketCreated"
          id="grade-level"
          v-model="gradeLevel"
        >
          <option selected disabled>Select a grade level</option>
          <option value="third-grade">Third grade</option>
          <!-- <option value="fourth-grade">Fourth grade</option>
          <option value="fifth-grade">Fifth grade</option> -->
        </select>
        <label for="subject-area">Select your subject area</label>
        <select
          v-if="gradeLevel === 'fifth-grade'"
          :disabled="$store.state.ticketManager.exitTicketCreated"
          id="subject-area"
          v-model="subjectArea"
        >
          <option selected disabled>Select a subject area</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
        </select>
        <select
          v-else
          :disabled="$store.state.ticketManager.exitTicketCreated"
          id="subject-area"
          v-model="subjectArea"
          style="margin-bottom: 5px"
        >
          <option selected disabled>Select a subject area</option>
          <option value="math">Math</option>
        </select>
        <!-- Button displays once all inputs are filled out -->
        <button
          :disabled="$store.state.ticketManager.exitTicketCreated"
          v-if="enableButton"
          class="blue-btn"
          @click="onSubmit"
        >
          Add questions
        </button>
      </form>
      <!-- Questions creator opens once exit ticket is created -->
      <QuestionsCreator v-if="$store.state.ticketManager.exitTicketCreated" />
    </div>
    <div
      v-else-if="!$store.state.editing && !anyExitTickets"
      class="empty-display"
    >
      <p style="margin-bottom: 5px">
        You do not have any exit tickets. Click the button to create one.
      </p>
      <button @click="$store.commit('toggleEditing')" class="blue-btn">
        Create ticket
      </button>
    </div>
    <div v-else class="tickets-display">
      <p>
        To view a ticket, click on its title in the sidebar, or click the button
        below to create a new ticket.
      </p>
      <button @click="$store.commit('toggleEditing')" class="blue-btn">
        Create ticket
      </button>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import QuestionsCreator from "./QuestionsCreator.vue";
import { mapGetters } from "vuex";

export default {
  name: "ExitTicketEditor",
  components: {
    QuestionsCreator,
  },
  data() {
    return {
      title: "",
      gradeLevel: "",
      subjectArea: "",
      // questions: [],
    };
  },
  methods: {
    onSubmit() {
      const newExitTicket = {
        exit_ticket: {
          user_id: "",
          title: this.title,
          grade_level: this.gradeLevel,
          subject_area: this.subjectArea,
        },
      };

      if (this.isLoggedIn) {
        newExitTicket.exit_ticket.user_id = this.getUserID;
        // fetch("https://exit-ticket-api.herokuapp.com/exit_tickets", {
        const url = new URL("http://localhost:3000");
        fetch(`${url}/exit_tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newExitTicket),
        })
          .then((response) => response.json())
          .then((data) => {
            this.$store.commit("setCurrentTicket", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        this.$store.commit("setUserlessExitTicket", newExitTicket);
        localStorage.exitTicket = JSON.stringify(newExitTicket);
        this.$store.commit("setCurrentTicket", newExitTicket);
      }

      this.$store.commit("resetCurrentTicketQuestions");
      this.$store.commit("setGradeLevel", this.gradeLevel);
      this.$store.commit("setSubjectArea", this.subjectArea);
      this.$store.commit("setExitTicketCreated");
      this.resetData();
    },
    resetData() {
      this.title = "";
      this.gradeLevel = "";
      this.subjectArea = "";
    },
    async deleteTicket() {
      await fetch(
        `https://exit-ticket-api.herokuapp.com/exit_tickets/${this.$store.state.ticketManager.currentTicket.id}`,
        { method: "DELETE" }
      );

      this.resetData();
      this.$store.commit("removeCurrentExitTicketFromCollection");
      this.$store.commit("resetCurrentTicket");
      this.$store.commit("resetCurrentTicketQuestions");
      this.$store.commit("disableEditing");
      this.$store.commit("activateEditor");
    },
  },
  // async beforeUnmount() {
  //   if (this.$store.state.ticketManager.currentTicketQuestions.length < 1) {
  //     await this.deleteTicket();
  //   }
  // },
  computed: {
    enableButton: function () {
      return (
        this.title !== "" && this.gradeLevel !== "" && this.subjectArea !== ""
      );
    },
    ...mapGetters(["getUserID", "isLoggedIn", "anyExitTickets"]),
  },
};
</script>

<style scoped lang="scss">
.editor-container {
  // position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  padding: 2em;
  width: 97%;
  height: auto;
  background-color: #fcfcfc;
}

@media (max-width: 1200px) {
  .editor-container {
    margin-top: 0;
    width: 95%;
  }
}

.ticket-creator-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.ticket-creator-form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

label {
  padding: 0.3em;
  text-align: center;
}

input,
select,
option {
  margin: 2px;
  width: 15em;
  height: 2em;
  font-family: inherit;
}

input:disabled {
  opacity: 50%;
}

.empty-display {
  text-align: center;
}

.tickets-display {
  display: flex;
  flex-direction: column;
  align-items: center;
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

button:disabled {
  opacity: 50%;
  cursor: default;
}
</style>
