<template>
  <div class="question-container">
    <!-- Select between reflection and standards-based question -->
    <div v-show="!questionStored" id="question-type-container">
      <label for="question-type"
        >What kind of question would you like to add?
      </label>
      <br />
      <select
        :disabled="disableInputs"
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
    <!-- If user selects sb question, they will choose a student expectation -->
    <div v-if="questionType === 'standardsBased' && !questionStored">
      <label for="student-expectation">Select a student expectation</label>
      <br />
      <select
        :disabled="disableInputs"
        v-model="studentExpectation"
        id="student-expectation"
        @change="fetchQuestionsByStudentExpectation"
      >
        <option selected disabled>Select a student expectation</option>
        <option
          v-for="student_expectation in currentExpectations"
          :key="student_expectation.index"
        >
          {{ student_expectation }}
        </option>
      </select>
      <!-- Displays all question images for the selected SE -->
      <form @submit.prevent @change="scrollToButton" class="question-form">
        <div
          class="question-image-container"
          v-for="question in contentQuestions"
          :key="question.id"
          style="margin-top: 0.5em"
        >
          <img :src="question.image_url" />
          <input
            type="radio"
            :id="question.id"
            name="se-radios"
            :value="question"
            v-model="currentSBQuestion"
          />
          <label class="radio-label" :for="question.id">Select question</label>
        </div>
        <div class="button-wrapper">
          <button
            :disabled="currentSBQuestion === undefined"
            @click="onSubmitSBQuestion"
            class="blue-btn"
            id="save-btn"
          >
            Save question
          </button>
        </div>
      </form>
    </div>
    <!-- Displays the saved question and provides the option to edit -->
    <div v-else-if="questionType === 'standardsBased' && questionStored">
      <h2>Question {{ questionNumber }}</h2>
      <img :src="currentSBQuestion.image_url" />
      <button class="blue-btn" @click="enableEdit">Edit question</button>
      <br />
      <button
        :disabled="nextQuestionAdded"
        v-show="$store.state.ticketManager.questionNumber != 5"
        @click="addQuestion"
        class="plus-btn"
      >
        <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
        <br />
        Add another question
      </button>
    </div>
    <!-- Add a new reflection question -->
    <div v-else-if="questionType === 'reflection' && !questionStored">
      <form @submit.prevent class="question-form">
        <label for="reflection-questions"
          >Select a reflection question to add to your exit ticket</label
        >
        <br />
        <select
          :disabled="disableInputs"
          id="reflection-questions"
          v-model="currentReflectionQuestion"
          @input="getQuestions"
        >
          <option
            v-for="question in $store.state.ticketManager.reflectionQuestions"
            :key="question.id"
          >
            {{ question }}
          </option>
        </select>
        <br />
        <!-- <label for="user-generated-reflection-question"
          >Or write your own question</label
        >
        <br />
        <input
          id="user-generated-reflection-question"
          type="text"
          v-model="currentReflectionQuestion"
        />
        <br /> -->
        <button
          :disabled="currentReflectionQuestionReadyToSave"
          @click="onSubmitReflectionQuestion"
          class="blue-btn"
          id="save-btn"
        >
          Save question
        </button>
      </form>
    </div>
    <!-- Displays the saved question and provides the option to edit -->
    <div v-if="questionType === 'reflection' && questionStored">
      <h2>Question {{ questionNumber }}</h2>
      <p>{{ currentReflectionQuestion }}</p>
      <p style="font-size: xx-large">
        &#128579; &#128533; &#128528; &#128578; &#128512;
      </p>
      <button class="blue-btn" @click="enableEdit">Edit question</button>
      <br />
      <button
        :disabled="nextQuestionAdded"
        v-show="$store.state.ticketManager.questionNumber != 5"
        @click="addQuestion"
        class="plus-btn"
      >
        <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
        <br />
        Add another question
      </button>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapGetters } from "vuex";
import HybridReflectionQuestion from "@/classes/HybridReflectionQuestion";
import SBExitTicketQuestion from "@/classes/SBReflectionExitTicketQuestion";
import UserlessSBQuestion from "@/classes/UserlessSBQuestion";
import UserlessReflectionQuestion from "@/classes/UserlessReflectionQuestion";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Question",
  data() {
    return {
      questionType: "",
      studentExpectation: "",
      contentQuestions: undefined,
      questionStored: false,
      currentSBQuestion: undefined,
      currentReflectionQuestion: "",
      questionText: "",
      displayButton: false,
      disableInputs: false,
      currentExpectations: undefined,
      imageUrl: "",
      nextQuestionAdded: false,
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
  props: ["questionNumber"],
  emits: ["add-question"],
  methods: {
    scrollToQuestions() {
      const questionContainers =
        document.getElementsByClassName("question-container");
      const currentContainer =
        questionContainers[questionContainers.length - 1];
      // Hacky solution, is there a better way?
      setTimeout(
        () => currentContainer.scrollIntoView({ behavior: "smooth" }),
        10
      );
    },
    scrollToButton() {
      const button = document.getElementById("save-btn");
      button.scrollIntoView({ behavior: "smooth" });
    },
    onSubmitSBQuestion(e) {
      e.preventDefault();

      let question;

      if (this.isLoggedIn) {
        question = new SBExitTicketQuestion(
          this.$store.state.ticketManager.currentTicket.id,
          this.currentSBQuestion.id,
          this.questionNumber
        );
        this.$store.commit("addPendingSBQuestion", question);
      } else {
        question = new UserlessSBQuestion(
          this.currentSBQuestion.image_url,
          this.questionNumber
        );
        this.$store.commit("addUserlessQuestion", question);
      }
      this.$store.commit("enableSave");
      this.questionStored = true;
    },
    onSubmitReflectionQuestion(e) {
      e.preventDefault();
      // This one is different because we also need to capture the text
      // to create the actual reflection question
      // Maybe just slap the text in here and pull everything apart in the
      // QuestionsCreator to do the POST requests?
      let question;

      if (this.isLoggedIn) {
        question = new HybridReflectionQuestion(
          this.$store.state.ticketManager.currentTicket.id,
          this.currentReflectionQuestion,
          this.questionNumber
        );
        this.$store.commit("addPendingReflectionQuestion", question);
      } else {
        question = new UserlessReflectionQuestion(
          this.currentReflectionQuestion,
          this.questionNumber
        );
        this.$store.commit("addUserlessQuestion", question);
      }

      this.$store.commit("enableSave");
      this.questionStored = true;
    },
    setExpectations() {
      const gradeAndSubject =
        this.$store.state.ticketManager.gradeLevel +
        this.$store.state.ticketManager.subjectArea;
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
    async fetchQuestionsByStudentExpectation() {
      const res = await fetch(
        `https://exit-ticket-api.herokuapp.com/standards_based_questions?student_expectation=${this.formatStudentExpectation}`
      );
      const data = await res.json();
      this.contentQuestions = [...data];
      if (this.studentExpectation === "3.2(A)") {
        this.contentQuestions = this.contentQuestions.slice(2);
      }

      this.scrollToQuestions();
    },
    addQuestion() {
      this.$emit("add-question");
      this.nextQuestionAdded = true;
    },
    // When editing a question, we first remove the pending question from the store
    enableEdit() {
      if (this.questionType === "standardsBased" && this.isLoggedIn) {
        const index = this.$store.state.ticketManager.pendingSBQuestions
          .map(function (q) {
            return q.sb_question_id;
          })
          .indexOf(this.currentSBQuestion.id);

        this.$store.commit("removePendingSBQuestionByIndex", index);
      } else if (this.questionType === "reflection" && this.isLoggedIn) {
        const index = this.$store.state.ticketManager.pendingReflectionQuestions
          .map(function (q) {
            return q.text;
          })
          .indexOf(this.currentReflectionQuestion);

        this.$store.commit("removePendingReflectionQuestionByIndex", index);
      } else {
        this.$store.commit(
          "removeUserlessQuestionByIndex",
          this.questionNumber - 1
        );
      }

      this.questionStored = false;
    },
  },
  computed: {
    formatStudentExpectation: function () {
      return this.studentExpectation
        .replace(".", "")
        .replace("(", "")
        .replace(")", "");
    },
    currentReflectionQuestionReadyToSave: function () {
      return (
        this.currentReflectionQuestion === undefined ||
        this.currentReflectionQuestion === ""
      );
    },
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    this.setExpectations();
  },
  mounted() {
    const questions = document.getElementsByClassName("question-container");
    questions[questions.length - 1].scrollIntoView({ behavior: "smooth" });
  },
};
</script>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  border: solid 0.2em;
  border-color: #253c55;
  border-radius: 5px;
  width: 40em;
  padding: 1em;
  background: rgba(127, 127, 127, 0.32);
  text-align: center;
}

@media (max-width: 768px) {
  .question-container {
    width: 95%;
  }

  .question-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  form {
    width: 95%;
  }
}

.question-image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
  border: solid 0.1em;
  border-color: #253c55;
  width: auto;
  padding: 1em;
  background-color: #f2f2f2;
}

@media (max-width: 768px) {
  .question-image-container {
    width: 95%;
  }
}

img {
  width: 33em;
  /* The border kind of makes it feel like too many lines? Little cramped. */
  /* border: solid 2px; */
}

@media (max-width: 768px) {
  img {
    width: 95%;
  }
}

input[type="radio"] {
  appearance: none;
}

.radio-label {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0 0 0;
  height: 2em;
  width: 28em;
  border: solid;
  border-radius: 3px;
  background-color: #fcfcfc;
}

@media (max-width: 768px) {
  .radio-label {
    width: 90%;
  }
}

.radio-label:hover {
  background-color: #4dc04d;
  cursor: pointer;
}

input[type="radio"]:checked + label {
  background-color: rgba(11, 100, 6, 0.92);
  color: #f2f2f2;
}

input[type="radio"]:focus + label {
  border: 1px solid;
}

select {
  width: 10em;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

button:disabled {
  opacity: 50%;
  cursor: default;
}

.plus-btn {
  margin-top: 0.75em;
  border: none;
  padding: 0 !important;
  background: none !important;
  cursor: pointer;
  color: rgba(11, 100, 6, 0.92);
}

h2 {
  padding-bottom: 0.5em;
}
</style>
