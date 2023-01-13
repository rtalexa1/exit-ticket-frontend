<template>
  <div class="editor-container">
    <div v-if="editing" class="ticket-creator-container">
      <h1>Create a Ticket</h1>
      <form @submit="onSubmit" class="ticket-creator-form">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Give your exit ticket a title"
        />
        <select>
          <option selected disabled>Select a grade level</option>
          <option value="third-grade">Third grade</option>
          <option value="fourth-grade">Fourth grade</option>
          <option value="fifth-grade">Fifth grade</option>
        </select>
        <select>
          <option selected disabled>Select a subject area</option>
          <option value="math">Math</option>
          <option value="reading">Reading</option>
          <option value="writing">Writing</option>
          <option value="science">Science</option>
        </select>
        <QuestionsCreator v-if="subjectAreaSelected" />
        <button v-if="readyToSave" type="submit">Save</button>
      </form>
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
      <button>Create ticket</button>
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
      editing: false,
      exitTickets: [],
      readyToSave: false,
      openQuestionsCreator: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault;
      this.editing = false;
      this.titleEntered = false;
      this.gradeLevelSelected = false;
      this.subjectAreaSelected = false;
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

input,
select {
  margin: 2px;
  width: 24.5em;
}

.empty-display {
  text-align: center;
}
</style>
