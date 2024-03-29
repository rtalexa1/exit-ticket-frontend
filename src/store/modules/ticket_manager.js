import axios from "axios";

const state = {
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
};
const getters = {
  anyExitTickets(state) {
    return state.exitTickets.length > 0;
  },
};
const mutations = {
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
  setCurrentTicketQuestions(state) {
    state.currentTicket.questions.forEach((question) => {
      state.currentTicketQuestions.push(question);
    });
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
  removeUserlessQuestionByIndex(state, index) {
    state.userlessQuestions.splice(index, 1);
  },
  sortUserlessQuestions(state) {
    state.userlessQuestions = state.userlessQuestions.sort((a, b) => {
      return a.order - b.order;
    });
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
  removePendingSBQuestionByIndex(state, index) {
    state.pendingSBQuestions.splice(index, 1);
  },
  resetPendingSBQuestions(state) {
    state.pendingSBQuestions = [];
  },
  addPendingReflectionQuestion(state, question) {
    state.pendingReflectionQuestions.push(question);
  },
  removePendingReflectionQuestionByIndex(state, index) {
    state.pendingReflectionQuestions.splice(index, 1);
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
};
const actions = {
  async fetchUpdatedTicket({ commit }, exitTicketId) {
    const res = await fetch(
      `https://exit-ticket-api.herokuapp.com/exit_tickets/${exitTicketId}`
    );
    const data = await res.json();
    commit("setCurrentTicket", data);
  },
  // async fetchTicketQuestions({ commit, state }) {
  // const url = new URL("http://localhost:3000");
  // const res = await fetch(
  //   `${url}/exit_tickets/${state.currentTicket.id}`
  // Update for production, and reformat url
  // `https://exit-ticket-api.herokuapp.com/users/${state.currentUser.id}/exit_tickets/${state.currentTicket.id}`
  // );
  // const data = await res.json();
  // console.log(state.currentTicket.questions);
  // state.currentTicket.questions.forEach((question) => {
  //   commit("addCurrentTicketQuestion", question);
  // });
  // },
  fetchExitTickets({ commit, rootState }) {
    // Update for production
    const BASE_URL = "https://exit-ticket-api.herokuapp.com/";
    const config = {
      headers: {
        Authorization: rootState.sessionManager.auth_token,
      },
    };

    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}exit_tickets`, config)
        .then((response) => {
          const tickets = response.data;
          tickets.forEach((ticket) => {
            commit("addExitTicket", ticket);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
