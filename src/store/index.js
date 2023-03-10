import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    registrationModalOpen: false,
    signInModalOpen: false,
    deleteModalOpen: false,
    resetModalOpen: false,
    cancelModalOpen: false,
    editorActive: true,
    editing: false,
    exitTicketCreated: false,
    currentTicket: undefined,
    currentTicketQuestions: [],
    exitTickets: [],
    userlessExitTicket: undefined,
    userlessQuestions: [],
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
    setCurrentUser(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    resetCurrentUser(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
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
    openDeleteModal(state) {
      state.deleteModalOpen = true;
    },
    closeDeleteModal(state) {
      state.deleteModalOpen = false;
    },
    openResetModal(state) {
      state.resetModalOpen = true;
    },
    closeResetModal(state) {
      state.resetModalOpen = false;
    },
    openCancelModal(state) {
      state.cancelModalOpen = true;
    },
    closeCancelModal(state) {
      state.cancelModalOpen = false;
    },
    setCurrentTicket(state, exitTicket) {
      state.currentTicket = exitTicket;
    },
    resetCurrentTicket(state) {
      state.currentTicket = undefined;
    },
    setExitTicketCreated(state) {
      state.exitTicketCreated = true;
    },
    resetExitTicketCreated(state) {
      state.exitTicketCreated = false;
    },
    addCurrentTicketQuestion(state, question) {
      state.currentTicketQuestions.push(question);
    },
    resetCurrentTicketQuestions(state) {
      state.currentTicketQuestions = [];
    },
    setExitTickets(state, exitTickets) {
      exitTickets.forEach((ticket) => state.exitTickets.push(ticket));
    },
    addExitTicket(state, newExitTicket) {
      state.exitTickets.push(newExitTicket);
    },
    removeCurrentExitTicketFromCollection(state) {
      state.exitTickets = state.exitTickets.filter(
        (ticket) => ticket !== state.currentTicket
      );
    },
    clearExitTickets(state) {
      state.exitTickets = [];
    },
    setUserlessExitTicket(state, newExitTicket) {
      state.userlessExitTicket = newExitTicket;
    },
    resetUserlessExitTicket(state) {
      state.userlessExitTicket = undefined;
    },
    addUserlessQuestion(state, question) {
      state.userlessQuestions.push(question);
    },
    resetUserlessQuestions(state) {
      state.userlessQuestions = [];
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
    resetQuestionNumber(state) {
      state.questionNumber = 1;
    },
    addPendingSBQuestion(state, question) {
      state.pendingSBQuestions.push(question);
    },
    removeLastPendingSBQuestion(state) {
      state.pendingSBQuestions.pop();
    },
    resetPendingSBQuestions(state) {
      state.pendingSBQuestions = [];
    },
    addPendingReflectionQuestion(state, question) {
      state.pendingReflectionQuestions.push(question);
    },
    removeLastPendingReflectionQuestion(state) {
      state.pendingReflectionQuestions.pop();
    },
    resetPendingReflectionQuestions(state) {
      state.pendingReflectionQuestions = [];
    },
    enableSave(state) {
      state.readyToSave = true;
    },
    disableSave(state) {
      state.readyToSave = false;
    },
    activateEditor(state) {
      state.editorActive = true;
    },
    deactivateEditor(state) {
      state.editorActive = false;
    },
    disableEditing(state) {
      state.editing = false;
    },
    toggleEditing(state) {
      state.editing = !state.editing;
    },
    startEditingNewTicket(state) {
      state.editorActive = true;
      state.editing = true;
    },
    totalReset(state) {
      state.currentTicket = undefined;
      state.currentTicketQuestions = [];
      state.exitTicketCreated = false;
      state.userlessExitTicket = undefined;
      state.userlessQuestions = [];
      state.questionNumber = 1;
      state.editorActive = true;
      state.editing = false;
      state.gradeLevel = "";
      state.subjectArea = "";
      state.readyToSave = false;
    },
    signOut(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      state.currentTicket = undefined;
      state.currentTicketQuestions = [];
      state.exitTickets = [];
      state.editorActive = true;
      state.editing = false;
      state.exitTicketCreated = false;
      state.gradeLevel = "";
      state.subjectArea = "";
    },
  },
  actions: {
    async setCurrentTicket({ commit, state }, exitTicketId) {
      const res = await fetch(
        `https://exit-ticket-api.herokuapp.com/users/${state.currentUser.id}/exit_tickets/${exitTicketId}`
      );
      const data = await res.json();
      commit("setCurrentTicket", data);
    },
    async fetchTicketQuestions({ commit, state }) {
      const res = await fetch(
        `https://exit-ticket-api.herokuapp.com/users/${state.currentUser.id}/exit_tickets/${state.currentTicket.id}`
      );
      const data = await res.json();
      data.forEach((question) => {
        commit("addCurrentTicketQuestion", question);
      });
    },
    async fetchExitTickets({ commit }) {
      const res = await fetch(
        `https://exit-ticket-api.herokuapp.com/users/${this.state.currentUser.id}/exit_tickets/`
      );
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
