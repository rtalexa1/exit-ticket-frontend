<template>
  <div id="question-type-container">
    <label for="question-type"
      >What kind of question would you like to add?
    </label>
    <br />
    <select v-model="questionType" id="question-type">
      <option selected disabled>
        What kind of question would you like to add?
      </option>
      <option value="standardsBased">Standards-based (TEKS)</option>
      <option value="reflection">Reflection</option>
    </select>
  </div>
  <div v-if="questionType === 'standardsBased'">
    <label for="student-expectation">Select a student expectation</label>
    <select id="student-expectation" v-model="studentExpectation">
      <option selected disabled>Select a student expectation</option>
    </select>
  </div>
  <div v-else-if="questionType === 'reflection'">
    <select v-model="questionText">
      <option
        v-for="question in $store.state.reflectionQuestions"
        :key="question.id"
      >
        {{ question }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Question",
  data() {
    return {
      questionType: "",
      questionText: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const newQuestion = {
        exit_ticket_id: this.$store.state.currentTicket.id,
        // exitTicketId = this.exitTicketID,
        text: this.questionText,
      };

      console.log(newQuestion);
    },
  },
};
</script>

<style></style>
