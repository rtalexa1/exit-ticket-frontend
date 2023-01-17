import { createStore } from "vuex";

export default createStore({
  state: {
    currentTicket: "",
    exitTickets: [],
  },
  getters: {},
  mutations: {
    addExitTicket(state, newExitTicket) {
      state.exitTickets.push(newExitTicket);
    },
  },
  actions: {
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
