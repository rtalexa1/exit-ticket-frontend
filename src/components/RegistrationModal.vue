<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeRegistrationModal')"
        />
      </div>
      <h2>Create an account</h2>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <input type="text" placeholder="Email" v-model="signUpEmail" />
      <input
        type="password"
        placeholder="Password"
        v-model="signUpPassword"
        style="margin-bottom: 5px"
      />
      <button @click="onSignUp" class="blue-btn">Submit</button>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions } from "vuex";

export default {
  name: "RegistrationModal",
  data() {
    return {
      signUpEmail: "",
      signUpPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    onSignUp(event) {
      event.preventDefault();
      let data = {
        user: {
          email: this.signUpEmail,
          password: this.signUpPassword,
        },
      };
      this.registerUser(data);
      this.resetData();
      this.$store.commit("closeRegistrationModal");
    },
    resetData() {
      this.signUpEmail = "";
      this.signUpPassword = "";
    },
  },
};
</script>

<style></style>
