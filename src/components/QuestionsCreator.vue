<template>
  <div class="questions-creator-container">
    <h3>Add up to five questions to your exit ticket</h3>
    <Question
      @add-question.once="incrementQuestionNumber"
      question-number="1"
    />
    <br />
    <Question
      v-if="$store.state.ticketManager.questionNumber >= 2"
      @add-question.once="incrementQuestionNumber"
      question-number="2"
    />
    <br />
    <Question
      v-if="$store.state.ticketManager.questionNumber >= 3"
      @add-question.once="incrementQuestionNumber"
      question-number="3"
    />
    <br />
    <Question
      v-if="$store.state.ticketManager.questionNumber >= 4"
      @add-question.once="incrementQuestionNumber"
      question-number="4"
    />
    <br />
    <Question
      v-if="$store.state.ticketManager.questionNumber === 5"
      question-number="5"
    />
    <!-- This button displays once at least one question is added to the exit ticket -->
    <!-- Upon submission, we need to take all the pending questions in the store
    and make POST requests to create new exit_ticket_questions with the question_id 
    and the exit_ticket_id -->
    <button
      v-if="$store.state.ticketManager.readyToSave"
      @click="assignQuestionsToExitTicket"
      class="blue-btn"
      style="margin-bottom: 5px"
    >
      Create exit ticket
    </button>
    <!-- This button will open a modal that will ask the user if they're sure.
    If the user says yes, then all ticket data will be reset and the editor will 
    revert to its default state -->
    <button class="blue-btn" @click="$store.commit('openCancelModal')">
      Cancel
    </button>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapGetters } from "vuex";
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
    enableSave() {
      this.$store.commit("enableSave");
    },
    async assignQuestionsToExitTicket() {
      if (this.isLoggedIn) {
        await this.createSBQuestions();
        await this.createReflectionQuestions();
        this.$store.commit(
          "addExitTicket",
          this.$store.state.ticketManager.currentTicket
        );
        await this.$store.dispatch("fetchTicketQuestions");
      } else {
        localStorage.setItem(
          "userlessQuestions",
          JSON.stringify(this.$store.state.ticketManager.userlessQuestions)
        );
      }

      this.$store.commit("deactivateEditor");
      this.$store.commit("disableSave");
      this.$store.commit("resetPendingSBQuestions");
      this.$store.commit("resetPendingReflectionQuestions");
      this.$store.commit("resetExitTicketCreated");
      this.$store.commit("resetQuestionNumber");
    },
    async createSBQuestions() {
      const questions = this.$store.state.ticketManager.pendingSBQuestions.map(
        (question) => {
          return {
            exit_ticket_id: question.exit_ticket_id,
            sb_question_id: question.sb_question_id,
            order: question.order,
          };
        }
      );

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          standards_based_exit_ticket_questions: questions,
        }),
      };

      const res = await fetch(
        "localhost:3000/standards_based_exit_ticket_questions",
        // Update for production
        // "https://exit-ticket-api.herokuapp.com/standards_based_exit_ticket_questions",
        options
      );
      const data = await res.json();
      return data;
    },
    async createReflectionQuestions() {
      const reflectionQuestions =
        this.$store.state.ticketManager.pendingReflectionQuestions.map(
          (question) => {
            return {
              text: question.text,
            };
          }
        );

      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reflection_questions: reflectionQuestions,
        }),
      };

      const res = await fetch(
        "localhost:3000/reflection_questions",
        // Update for production
        // "https://exit-ticket-api.herokuapp.com/reflection_questions",
        options
      );
      const data = await res.json();

      const exitTicketQuestions = data.map((question, index) => {
        return {
          exit_ticket_id: this.$store.state.ticketManager.currentTicket.id,
          ref_question_id: question.id,
          order:
            this.$store.state.ticketManager.pendingReflectionQuestions[index]
              .order,
        };
      });

      options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reflection_exit_ticket_questions: exitTicketQuestions,
        }),
      };

      const exitTicketRes = await fetch(
        "localhost:3000/reflection_exit_ticket_questions",
        // Update for production
        // "https://exit-ticket-api.herokuapp.com/reflection_exit_ticket_questions",
        options
      );
      const exitTicketData = await exitTicketRes.json();
      return exitTicketData;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
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
  border-radius: 20px;
  padding: 1em;
}

@media (max-width: 768px) {
  .questions-creator-container {
    width: 90vw;
  }
}
</style>
