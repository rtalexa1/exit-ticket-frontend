<template>
  <select>
    <option selected disabled>
      Choose a question or create write your own
    </option>
    <option v-for="question in questions" :key="question.id">
      {{ question.value }}
    </option>
  </select>
</template>

<script>
export default {
  name: "ReflectionQuestionCreator",
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    async fetchQuestions() {
      const res = await fetch("http://localhost:3000/reflection_questions");
      const data = await res.json();
      return data;
    },
  },
  async created() {
    const data = await this.fetchQuestions();
    this.questions.push(...data);
  },
};
</script>

<style></style>
