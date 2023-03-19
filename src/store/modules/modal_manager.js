const state = {
  registrationModalOpen: false,
  signInModalOpen: false,
  deleteModalOpen: false,
  resetModalOpen: false,
  cancelModalOpen: false,
};
const mutations = {
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
};
export default {
  state,
  mutations,
};
