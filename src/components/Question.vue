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
    <!-- Need to add a form here -> follow same pattern as below -->
    <div v-if="questionType === 'standardsBased'">
      <label for="student-expectation">Select a student expectation</label>
      <select
        :disable="disableInputs"
        id="student-expectation"
        v-model="studentExpectation"
      >
        <option selected disabled>Select a student expectation</option>
      </select>
      <button v-if="displayButton" @click="onSubmit" class="plus-btn">
        <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
        <br />
        Add another question
      </button>
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
        >
          <option
            v-for="question in $store.state.reflectionQuestions"
            :key="question.id"
          >
            {{ question }}
          </option>
        </select>
        <br />
        <button v-if="enableButton" @click="onSubmit" class="plus-btn">
          <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
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

      const newQuestion = {
        exit_ticket_id: this.$store.state.currentTicket.id,
        text: this.questionText,
      };

      this.$store.commit("addPendingQuestion", newQuestion);
      this.disableInputs = true;
      this.$emit("question-created");
    },
  },
  computed: {
    enableButton: function () {
      return this.questionText !== "";
    },
  },
};
</script>

<style>
.question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  width: 23.5em;
  padding: 1em;
  background: rgba(127, 127, 127, 0.32);
  text-align: center;
}

select {
  width: 10em;
}

.plus-btn {
  background: none !important;
  border: none;
  padding: 0 !important;
  color: rgba(11, 100, 6, 0.92);
  cursor: pointer;
}
</style>
