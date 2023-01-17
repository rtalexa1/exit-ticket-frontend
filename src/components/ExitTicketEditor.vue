<template>
  <div class="editor-container">
    <div v-if="editing" class="ticket-creator-container">
      <h1>Create a Ticket</h1>
      <form @submit="onSubmit" class="ticket-creator-form">
        <label for="title">Give your exit ticket a title</label>
        <input
          id="title"
          type="text"
          name="title"
          v-model="title"
          @input="titleEntered = true"
        />
        <label for="grade-level">Select your grade level</label>
        <select
          id="grade-level"
          v-model="gradeLevel"
          @input="gradeLevelSelected = true"
        >
          <option selected disabled>Select a grade level</option>
          <option value="third-grade">Third grade</option>
          <option value="fourth-grade">Fourth grade</option>
          <option value="fifth-grade">Fifth grade</option>
        </select>
        <label for="subject-area">Select your subject area</label>
        <select
          id="subject-area"
          v-model="subjectArea"
          @input="subjectAreaSelected = true"
        >
          <option selected disabled>Select a subject area</option>
          <option value="math">Math</option>
          <option value="reading">Reading</option>
          <option value="writing">Writing</option>
          <option value="science">Science</option>
        </select>
        <!-- Button is disabled until all t -->
        <button
          :disabled="
            !titleEntered || !subjectAreaSelected || !gradeLevelSelected
          "
          type="submit"
        >
          Add questions
        </button>
      </form>
      <QuestionsCreator
        v-if="exitTicketCreated"
        grade-level="gradeLevel"
        subject-area="subjectArea"
      />
      <!-- <button v-if="readyToSave" type="submit">Save</button> -->
    </div>
    <div v-else-if="!editing && exitTickets.length < 1" class="empty-display">
      <p>You do not have any exit tickets. Click the button to create one.</p>
      <button @click="editing = !editing">Create ticket</button>
    </div>
    <div v-else>
      <p>
        Click on a ticket to view it, or click the button to create a new
        ticket.
      </p>
      <button @click="editing = !editing">Create ticket</button>
    </div>
  </div>
</template>

<script>
import QuestionsCreator from "./QuestionsCreator.vue";

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
      editing: false,
      titleEntered: false,
      gradeLevelSelected: false,
      subjectAreaSelected: false,
      enableButton: false,
      exitTicketCreated: false,
      readyToSave: false,
      exitTickets: [],
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault;

      const newExitTicket = {
        exit_ticket: {
          user_id: 1,
          title: this.title,
          grade_level: this.gradeLevel,
          subject_area: this.subjectArea,
        },
      };

      fetch("http://localhost:3000/users/1/exit_tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExitTicket),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      this.editing = false;
      // this.userId = "";
      this.gradeLevel = "";
      this.subjectArea = "";
      this.title = "";
    },
  },
};
</script>

<style scoped lang="scss">
.editor-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5em;
  border: solid 2px;
  border-radius: 5px;
  padding: 2em;
  width: 95%;
  height: auto;
  background-color: #fcfcfc;
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
  text-align: center;
}

input,
select {
  margin: 2px;
  width: 24.5em;
}

.empty-display {
  text-align: center;
}
</style>
