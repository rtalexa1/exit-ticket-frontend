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
      <input type="text" placeholder="Email" v-model="email" />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        style="margin-bottom: 5px"
      />
      <button @click="register" class="blue-btn">Submit</button>
      <button @click="signInWithGoogle" class="blue-btn">
        Sign up with Google
      </button>
    </div>
  </div>
</template>

<script>
import "@/store/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegistrationModal",
  data() {
    return {
      signUpEmail: "",
      signUpPassword: "",
      loginEmail: "",
      loginPassword: "",
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["getAuthToken", "getUserEmail", "getUserID", "isLoggedIn"]),
  },
};
</script>

<style></style>
