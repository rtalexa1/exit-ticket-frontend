<template>
  <div class="question-container">
    <div id="question-type-container">
      <label for="question-type"
        >What kind of question would you like to add?
      </label>
      <br />
      <select
        :disable="disableInputs"
        v-model="questionType"
        id="question-type"
      >
        <option selected disabled>
          What kind of question would you like to add?
        </option>
        <option value="standardsBased">Standards-based (TEKS)</option>
        <option value="reflection">Reflection</option>
      </select>
    </div>
    <div v-if="questionType === 'standardsBased'">
      <label for="student-expectation">Select a student expectation</label>
      <select
        :disable="disableInputs"
        id="student-expectation"
        v-model="studentExpectation"
      >
        <option selected disabled>Select a student expectation</option>
      </select>
    </div>
    <div v-else-if="questionType === 'reflection'">
      <form @submit.prevent>
        <label for="reflection-questions"
          >Select a reflection question to add to your exit ticket</label
        >
        <br />
        <select
          :disable="disableInputs"
          id="reflection-questions"
          v-model="questionText"
          @input="displayButton = true"
        >
          <option
            v-for="question in $store.state.reflectionQuestions"
            :key="question.id"
          >
            {{ question }}
          </option>
        </select>
        <br />
        <button v-if="displayButton" @click="onSubmit">
          <font-awesome-icon icon="fa-solid fa-plus" />
          <br />
          Add another question
        </button>
      </form>
    </div>
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
      displayButton: false,
      disableInputs: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      // const newQuestion = {
      //   exit_ticket_id: this.$store.state.currentTicket.id,
      //   text: this.questionText,
      // };

      this.disableInputs = true;
      this.$emit("question-created");
    },
  },
};
</script>

<style>
.question-container {
  padding: 1em;
  background: rgba(127, 127, 127, 0.32);
}
</style>
