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
      state.ticketManager.currentTicket = undefined;
      state.ticketManager.currentTicketQuestions = [];
      state.ticketManager.pendingSBQuestions = [];
      state.ticketManager.pendingReflectionQuestions = [];
      state.ticketManager.exitTicketCreated = false;
      state.ticketManager.userlessExitTicket = undefined;
      state.ticketManager.userlessQuestions = [];
      state.ticketManager.questionNumber = 1;
      state.editorActive = true;
      state.editing = false;
      state.ticketManager.gradeLevel = "";
      state.ticketManager.subjectArea = "";
      state.ticketManager.readyToSave = false;
    },
    signOut(state) {
      state.ticketManager.currentTicket = undefined;
      state.ticketManager.currentTicketQuestions = [];
      state.ticketManager.exitTickets = [];
      state.editorActive = true;
      state.editing = false;
      state.ticketManager.exitTicketCreated = false;
      state.ticketManager.gradeLevel = "";
      state.ticketManager.subjectArea = "";
    },
  },
  modules: {
    modalManager,
    sessionManager,
    ticketManager,
  },
});
