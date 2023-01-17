import { createStore } from "vuex";

export default createStore({
  state: {
    currentTicket: "",
    exitTickets: [],
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
