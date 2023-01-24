<template>
  <p>Add up to five questions to your exit ticket</p>
  <div class="questions-creator-container">
    <!-- Pass in standardsBasedQuestions once we can access them -->
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
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    incrementQuestionNumber() {
      this.$store.commit("incrementQuestionNumber");
    },
    async fetchQuestionsByParams() {
      // https://staar-questions.s3.us-east-2.amazonaws.com/third-grade/math/32A3.jpg
      const res = await fetch(
        "http://localhost:3000/standards_based_questions/5"
      );
      const data = await res.json();
      console.log(data);
      this.imageUrl = data.image_url;
    },
  },
  async created() {
    await this.fetchQuestionsByParams();
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
