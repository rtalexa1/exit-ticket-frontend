<template>
  <form @submit="onSubmit" id="question-form">
    <div id="question-type-container">
      <select v-model="questionType">
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
    <div v-else>
      <select v-model="questionText">
        <option
          v-for="question in store.state.reflectionQuestions"
          :key="question.id"
        >
          {{ question.text }}
        </option>
      </select>
    </div>
  </form>
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
        // Need to pass this into each question after creating the exit ticket in the prior step
        // exitTicketId = this.exitTicketID,
        text: this.questionText,
      };

      console.log(newQuestion);
    },
  },
};
</script>

<style></style>
