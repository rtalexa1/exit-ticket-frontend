<template>
  <div class="container">
    <button style="margin: 2px">Add a TEKS-based question</button>
    <button style="margin: 2px">Add a reflection question</button>
    <select>
      <option selected disabled>
        Choose a question or create write your own
      </option>
      <option v-for="question in questions" :key="question.id">
        {{ question.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ReflectionQuestionCreator",
  data() {
    return {
      questions: [],
      questionOneCreated: false,
      questionTwoCreated: false,
      questionThreeCreated: false,
      questionFourCreated: false,
      questionFiveCreated: false,
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
    console.log(this.questions);
  },
};
</script>

<style scoped>
input,
select {
  margin: 2px;
  width: 24.5em;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
