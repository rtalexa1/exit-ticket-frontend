<template>
  <div class="display-container">
    <div class="exit-ticket-display-container">
      <div class="pdf-container" id="pdf-content">
        <h1>{{ $store.state.currentTicket.title }}</h1>
        <div
          class="question-container"
          v-for="question in $store.state.currentTicketQuestions"
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
              <p style="font-size: x-large">
                &#129313; &#128533; &#128528; &#128578; &#128512;
              </p>
            </div>
          </div>
        </div>
      </div>
      <button @click="exportToPDF" class="blue-btn" style="margin-bottom: 3px">
        Save as PDF
      </button>
      <!-- <button class="blue-btn">Edit</button> -->
      <button
        v-if="$store.state.currentUser"
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
import html2pdf from "html2pdf.js";

export default {
  name: "ExitTicketDisplay",
  methods: {
    exportToPDF() {
      const options = {
        margin: 8,
        filename: `${this.$store.state.currentTicket.title}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          dpi: 300,
          letterRendering: true,
          useCORS: true,
        },
      };
      html2pdf(document.getElementById("pdf-content"), options);
    },
  },
};
</script>

<style scoped lang="scss">
.display-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6.3em;
  margin-bottom: 1em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  padding: 2em;
  width: 97%;
  height: auto;
  background-color: #fcfcfc;
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
  align-items: center;
  margin: 0.5em 0;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  border: solid 0.2em;
  border-color: #253c55;
  border-radius: 5px;
  width: 40em;
  padding: 1em;
  background: rgba(127, 127, 127, 0.32);
  text-align: center;
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
  width: 35em;
}
</style>
