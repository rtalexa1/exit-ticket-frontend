<template>
  <!-- Add a form within EACH div, with a button (plus sign) that emits 
  a signal that will enable the next Question element so that they display one 
  at a time -->

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
    <label for="reflection-questions"
      >Select a reflection question to add to your exit ticket</label
    >
    <br />
    <select id="reflection-questions" v-model="questionText">
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

      // const newQuestion = {
      //   exit_ticket_id: this.$store.state.currentTicket.id,
      //   text: this.questionText,
      // };

      this.$emit("question-created");
    },
  },
};
</script>

<style></style>
