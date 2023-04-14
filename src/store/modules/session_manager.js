import axios from "axios";

// Update url for production
const BASE_URL = "https://exit-ticket-api.herokuapp.com/";

const state = {
  auth_token: null,
  user: {
    id: null,
    email: null,
  },
};
const getters = {
  getAuthToken(state) {
    return state.auth_token;
  },
  getUserEmail(state) {
    return state.user?.email;
  },
  getUserID(state) {
    return state.user?.id;
  },
  isLoggedIn(state) {
    const loggedOut =
      state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  },
};
const mutations = {
  setUserInfo(state, payload) {
    state.user = payload.data.user;
    state.auth_token = payload.headers.authorization;
    axios.defaults.headers.common["Authorization"] =
      payload.headers.authorization;
    localStorage.setItem("auth_token", payload.headers.authorization);
  },
  setUserInfoFromToken(state, payload) {
    state.user = payload.data.user;
    state.auth_token = localStorage.getItem("auth_token");
  },
  // Add logic to this function to reset all exit-ticket-related data in rootState
  resetUserInfo(state) {
    state.user = {
      id: null,
      email: null,
    };
    state.auth_token = null;
    localStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = null;
  },
};
const actions = {
  registerUser({ commit }, payload) {
    commit("displayLoader");
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users`, payload)
        .then((response) => {
          commit("setUserInfo", response);
          setTimeout(() => {
            commit("hideLoader");
          }, 300);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logInUser({ commit }, payload) {
    commit("displayLoader");
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users/sign_in`, payload)
        .then((response) => {
          commit("setUserInfo", response);
          setTimeout(() => {
            commit("hideLoader");
          }, 300);
          resolve(response);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },
  logOutUser({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}users/sign_out`, config)
        .then(() => {
          commit("resetUserInfo");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  loginWithUserToken({ commit }, payload) {
    const config = {
      headers: {
        Authorization: payload.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}member-data`, config)
        .then((response) => {
          commit("setUserInfoFromToken", response);
          resolve(response);
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
