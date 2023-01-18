import { createStore } from "vuex";

export default createStore({
  state: {
    currentTicket: "",
    exitTickets: [],
    reflectionQuestions: [
      "How do you feel about what you learned today?",
      "Was there anything that clicked for you today?",
      "Is there anything that is still fuzzy for you?",
      "Do you think you could teach this topic to someone else?",
      "How confident are you about your understanding of today's topic?",
    ],
    questionNumber: 1,
    pendingQuestions: [],
  },
  getters: {
    anyExitTickets(state) {
      return state.exitTickets.length > 0;
    },
  },
  mutations: {
    setCurrentTicket(state, exitTicket) {
      state.currentTicket = exitTicket;
    },
    setExitTickets(state, exitTickets) {
      exitTickets.forEach((ticket) => state.exitTickets.push(ticket));
    },
    addExitTicket(state, newExitTicket) {
      state.exitTickets.push(newExitTicket);
    },
    incrementQuestionNumber(state) {
      state.questionNumber++;
    },
    addPendingQuestion(state, question) {
      state.pendingQuestions.push(question);
    },
  },
  actions: {
    async setCurrentTicket({ commit }, exitTicketId) {
      const res = await fetch(
        `http://localhost:3000/users/1/exit_tickets/${exitTicketId}`
      );
      const data = await res.json();
      commit("setCurrentTicket", data);
    },
    async addExitTicket({ commit }, exitTicketId) {
      const res = await fetch(
        `http://localhost:3000/users/1/exit_tickets/${exitTicketId}`
      );
      const data = await res.json();
      commit("addExitTicket", data);
    },
  },
  modules: {},
});
