import { createStore } from "vuex";

export default createStore({
  state: {
    currentTicket: "",
    exitTickets: [],
    questionNumber: 1,
    pendingSBQuestions: [],
    pendingReflectionQuestions: [],
    reflectionQuestions: [
      "How well do you understand this topic?",
      "How easily could you teach this topic to a friend?",
      "How much do you agree with this statement: I feel confident about what I learned today.",
    ],
    gradeLevel: "",
    subjectArea: "",
    readyToSave: false,
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
    setGradeLevel(state, gradeLevel) {
      state.gradeLevel = gradeLevel;
    },
    setSubjectArea(state, subjectArea) {
      state.subjectArea = subjectArea;
    },
    incrementQuestionNumber(state) {
      state.questionNumber++;
    },
    addPendingSBQuestion(state, question) {
      state.pendingSBQuestions.push(question);
    },
    removeLastPendingSBQuestion(state) {
      state.pendingSBQuestions.pop();
    },
    addPendingReflectionQuestion(state, question) {
      state.pendingReflectionQuestions.push(question);
    },
    removeLastPendingReflectionQuestion(state) {
      state.pendingReflectionQuestions.pop();
    },
    enableSave(state) {
      state.readyToSave = true;
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
