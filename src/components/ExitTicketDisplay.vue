<template>
  <div class="display-container">
    <div class="exit-ticket-display-container">
      <div class="pdf-container" id="pdf-content">
        <h1 v-if="$store.state.ticketManager.userlessExitTicket">
          {{ $store.state.ticketManager.userlessExitTicket.exit_ticket.title }}
        </h1>
        <h1 v-else>{{ $store.state.ticketManager.currentTicket.title }}</h1>
        <div
          class="question-container"
          v-for="question in selectQuestions"
          :key="question.order"
        >
          <div v-if="question.type === 'sb_question'" class="question">
            <h2>Question {{ question.order }}</h2>
            <div class="question-image-container">
              <img :src="question.image_url" />
            </div>
          </div>
          <div v-else class="question">
            <h2>Question {{ question.order }}</h2>
            <div class="reflection-question-container">
              <p>{{ question.text }}</p>
              <p style="font-size: xx-large">
                &#128579; &#128533; &#128528; &#128578; &#128512;
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="google-btn">
        <div id="widget-div"></div>
      </div> -->
      <button
        @click="exportToPDF"
        class="blue-btn"
        style="margin-top: 0; margin-bottom: 6px"
      >
        Save as PDF
      </button>
      <!-- <button class="blue-btn">Edit</button> -->
      <button
        v-if="isLoggedIn"
        @click="$store.commit('openDeleteModal')"
        class="blue-btn"
      >
        Delete
      </button>
      <button v-else @click="$store.commit('openResetModal')" class="blue-btn">
        Start over
      </button>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapGetters } from "vuex";
import html2pdf from "html2pdf.js";

export default {
  name: "ExitTicketDisplay",
  methods: {
    exportToPDF() {
      let name = this.isLoggedIn
        ? this.$store.state.ticketManager.currentTicket.title
        : this.$store.state.ticketManager.currentTicket.exit_ticket.title;

      const options = {
        margin: 8,
        filename: `${name}`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          dpi: 300,
          letterRendering: true,
          useCORS: true,
        },
        pagebreak: {
          mode: "avoid-all",
        },
      };
      html2pdf(document.getElementById("pdf-content"), options);
    },
  },
  computed: {
    selectQuestions: function () {
      if (this.$store.state.ticketManager.userlessExitTicket) {
        return this.$store.state.ticketManager.userlessQuestions;
      } else {
        return this.$store.state.ticketManager.currentTicketQuestions;
      }
    },
    ...mapGetters(["isLoggedIn"]),
  },
  async mounted() {
    await window.renderWidget();
  },
};
</script>

<style scoped lang="scss">
.display-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  padding: 2em;
  width: 97%;
  height: auto;
  background-color: #fcfcfc;
}

@media (max-width: 1200px) {
  .display-container {
    margin-top: 0;
    width: 95%;
  }
}

.exit-ticket-display-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5em;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  border: solid;
  border-radius: 5px;
  min-width: 40em;
  padding: 1em;
}

.pdf-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.question-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  border: solid 0.2em;
  border-color: #253c55;
  border-radius: 5px;
  width: 38em;
  padding: 1em;
  background: rgba(127, 127, 127, 0.32);
  text-align: center;
}

@media (max-width: 768px) {
  .question-container {
    align-items: center;
    width: 95%;
  }
}
.question-image-container {
  display: flex;
  flex-direction: column;
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

.reflection-question-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em 0;
  border: solid 0.1em;
  border-color: #253c55;
  width: auto;
  padding: 1em;
  background-color: #f2f2f2;
}

img {
  width: 33em;
}

@media (max-width: 768px) {
  img {
    width: 15em;
  }
}

.google-btn {
  margin-top: 5px;
}
</style>
