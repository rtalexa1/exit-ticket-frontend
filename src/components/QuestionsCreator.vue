<template>
  <div class="questions-creator-container">
    <h3>Add up to five questions to your exit ticket</h3>
    <Question @question-created="incrementQuestionNumber" />
    <br />
    <Question
      v-if="$store.state.questionNumber >= 2"
      @question-created="incrementQuestionNumber"
    />
    <br />
    <Question
      v-if="$store.state.questionNumber >= 3"
      @question-created="incrementQuestionNumber"
    />
    <br />
    <Question
      v-if="$store.state.questionNumber >= 4"
      @question-created="incrementQuestionNumber"
    />
    <br />
    <Question v-if="$store.state.questionNumber === 5" />
  </div>
</template>

<script>
import Question from "./Question.vue";

export default {
  name: "QuestionsCreator",
  components: {
    Question,
  },
  methods: {
    incrementQuestionNumber() {
      this.$store.commit("incrementQuestionNumber");
    },
  },
};
</script>

<style scoped>
h3 {
  padding-bottom: 0.5em;
}

input,
select {
  margin: 2px;
  width: 24.5em;
}

.questions-creator-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5em;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  border: solid;
  /* border-radius: 5px; */
  height: auto;
  padding: 1em;
}
</style>
