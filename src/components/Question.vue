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
      <p>Standards-based questions here</p>
    </div>
    <div v-else>
      <select v-model="questionText">
        <option v-for="question in reflectionQuestions" :key="question.id">
          {{ question.text }}
        </option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  name: "ReflectionQuestion",
  props: ["reflectionQuestions"],
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
