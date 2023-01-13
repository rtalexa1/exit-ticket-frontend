<template>
  <p>Add up to five questions to your exit ticket</p>
  <div class="questions-creator-container">
    <!-- Pass in standardsBasedQuestions once we can access them -->
    <Question reflection-questions="reflectionQuestions" />
    <Question reflection-questions="reflectionQuestions" />
    <Question reflection-questions="reflectionQuestions" />
    <Question reflection-questions="reflectionQuestions" />
    <Question reflection-questions="reflectionQuestions" />
  </div>
</template>

<script>
import Question from "./Question.vue";

export default {
  name: "QuestionsCreator",
  props: ["gradeLevel", "subjectArea"],
  data() {
    return {
      questions: [],
      reflectionQuestions: [
        "How do you feel about what you learned today?",
        "Was there anything that clicked for you today?",
        "Is there anything that is still fuzzy for you?",
        "Do you think you could teach this topic to someone else?",
        "How confident are you about your understanding of today's topic?",
      ],
    };
  },
  components: {
    Question,
  },
  // methods: {
  //   async fetchReflectionQuestions() {
  //     const res = await fetch("http://localhost:3000/reflection_questions");
  //     const data = await res.json();
  //     return data;
  //   },
  // },
  // async created() {
  //   const data = await this.fetchReflectionQuestions();
  //   this.reflectionQuestions.push(...data);
  // },
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
