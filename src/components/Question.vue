<template>
  <div id="question-container">
    <select>
      <option selected disabled>
        What kind of question would you like to add?
      </option>
      <option value="standardsBased">Standards-based (TEKS)</option>
      <option value="reflection">Reflection</option>
    </select>
  </div>
  <!-- <select>
    <option selected disabled>
      Choose a question or create write your own
    </option>
    <option v-for="question in questions" :key="question.id">
      {{ question.text }}
    </option>
  </select> -->
</template>

<script>
export default {
  name: "ReflectionQuestion",
  props: ["reflectionQuestions"],
};
</script>

<style></style>
