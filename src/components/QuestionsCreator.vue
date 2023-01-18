<template>
  <p>Add up to five questions to your exit ticket</p>
  <div class="questions-creator-container">
    <!-- Pass in standardsBasedQuestions once we can access them -->
    <Question />
    <Question />
    <Question />
    <Question />
    <Question />
  </div>
</template>

<script>
import Question from "./Question.vue";

export default {
  name: "QuestionsCreator",
  components: {
    Question,
  },
};
</script>

<style scoped>
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
}
</style>
