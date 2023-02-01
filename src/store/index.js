import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    currentUser: null,
    registrationModalOpen: false,
    signInModalOpen: false,
    editorActive: true,
    editing: false,
    currentTicket: undefined,
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
    logUserIn(state) {
      state.isLoggedIn = true;
    },
    logUserOut(state) {
      state.isLoggedIn = false;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    openRegistrationModal(state) {
      state.registrationModalOpen = true;
    },
    closeRegistrationModal(state) {
      state.registrationModalOpen = false;
    },
    openSignInModal(state) {
      state.signInModalOpen = true;
    },
    closeSignInModal(state) {
      state.signInModalOpen = false;
    },
    setCurrentTicket(state, exitTicket) {
      state.currentTicket = exitTicket;
    },
    resetCurrentTicket(state) {
      state.currentTicket = undefined;
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
    activateEditor(state) {
      state.editorActive = true;
    },
    deactivateEditor(state) {
      state.editorActive = false;
    },
    toggleEditing(state) {
      state.editing = !state.editing;
    },
    startEditingNewTicket(state) {
      state.editorActive = true;
      state.editing = true;
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
    // async fetchExitTicket({ commit }, exitTicketId) {
    //   const res = await fetch(
    //     `http://localhost:3000/users/1/exit_tickets/${exitTicketId}`
    //   );
    //   const data = await res.json();
    //   commit("addExitTicket", data);
    // },
    async fetchExitTickets({ commit }) {
      const res = await fetch("http://localhost:3000/users/1/exit_tickets/");
      const data = await res.json();
      const stringified = this.state.exitTickets.map((ticket) =>
        JSON.stringify(ticket)
      );
      for (let i = 0; i < data.length; i++) {
        if (stringified.includes(JSON.stringify(data[i]))) continue;
        commit("addExitTicket", data[i]);
      }
    },
  },
  modules: {},
});
