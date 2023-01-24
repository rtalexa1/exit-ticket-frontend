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
        @input="fetchQuestionsByStudentExpectation"
      >
        <option selected disabled>Select a student expectation</option>
        <option
          v-for="student_expectation in currentExpectations"
          :key="student_expectation.index"
        >
          {{ student_expectation }}
        </option>
      </select>
      <!-- <input type="radio" id="q1" name="q1" value="q1" />
      <div class="question-image-container">
        <img
          src="https://staar-questions.s3.us-east-2.amazonaws.com/third-grade/math/32A1.jpg"
        />
      </div> -->
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
          @input="getQuestions"
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
// import { questionCounts } from "src/constants.js";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Question",
  data() {
    return {
      questionType: "",
      studentExpectation: "",
      contentQuestions: [],
      questionText: "",
      displayButton: false,
      disableInputs: false,
      currentExpectations: undefined,
      thirdGradeMath: [
        "3.2(A)",
        "3.2(B)",
        "3.2(C)",
        "3.2(D)",
        "3.3(A)",
        "3.3(C)",
        "3.3(D)",
        "3.3(E)",
        "3.3(F)",
        "3.3(G)",
        "3.4(A)",
        "3.4(B)",
        "3.4(C)",
        "3.4(D)",
        "3.4(E)",
        "3.4(F)",
        "3.4(G)",
        "3.4(H)",
        "3.4(I)",
        "3.4(J)",
        "3.4(K)",
        "3.5(A)",
        "3.5(B)",
        "3.5(C)",
        "3.5(D)",
        "3.5(E)",
        "3.6(A)",
        "3.6(B)",
        "3.6(C)",
        "3.6(E)",
        "3.7(A)",
        "3.7(B)",
        "3.7(C)",
        "3.7(D)",
        "3.8(A)",
        "3.8(B)",
        "3.9(A)",
        "3.9(B)",
        "3.9(D)",
      ],
      fourthGradeMath: ["4.1(A)"],
      fifthGradeMath: ["5.1(A)"],
      fifthGradeScience: ["5.1(A)"],
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
    setExpectations() {
      const gradeAndSubject =
        this.$store.state.gradeLevel + this.$store.state.subjectArea;
      if (gradeAndSubject === "third-grademath") {
        this.currentExpectations = this.thirdGradeMath;
      } else if (gradeAndSubject === "fourth-grademath") {
        this.currentExpectations = this.fourthGradeMath;
      } else if (gradeAndSubject === "fifth-grademath") {
        this.currentExpectations = this.fifthGradeMath;
      } else {
        this.currentExpectations = this.fifthGradeScience;
      }
    },
    fetchQuestionsByStudentExpectation() {
      const formattedStudentExpectation = this.formatStudentExpectation();

      fetch(
        "http://localhost:3000/standards_based_questions/" +
          new URLSearchParams({
            student_expectation: formattedStudentExpectation,
          })
      );
    },
  },
  computed: {
    enableButton: function () {
      return this.questionText !== "";
    },
    formatStudentExpectation: function () {
      return this.studentExpectation
        .replace(".", "")
        .replace("(", "")
        .replace(")", "");
    },
  },
  created() {
    this.setExpectations();
  },
};
</script>

<style scoped>
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

img {
  width: 35em;
}

.question-image-container {
  width: 5em;
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
