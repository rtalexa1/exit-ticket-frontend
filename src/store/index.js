import { createStore } from "vuex";
import modalManager from "./modules/modal_manager";
import sessionManager from "./modules/session_manager";
import ticketManager from "./modules/ticket_manager";

export default createStore({
  state: {
    loaderVisible: false,
    editorActive: true,
    editing: false,
  },
  mutations: {
    displayLoader(state) {
      state.loaderVisible = true;
    },
    hideLoader(state) {
      state.loaderVisible = false;
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
  modules: {
    modalManager,
    sessionManager,
    ticketManager,
  },
});
