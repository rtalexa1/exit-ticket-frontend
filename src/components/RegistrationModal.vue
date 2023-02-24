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
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default {
  name: "RegistrationModal",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((result) => {
          return result.user.email;
        })
        .then((result) => {
          const user = {
            user: {
              email: result,
            },
          };

          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          };

          return fetch("https://exit-ticket-api.herokuapp.com/users", options);
        })
        .then((result) => result.json())
        .then((result) => {
          this.$store.commit("setCurrentUser", result);
          this.$store.commit("closeRegistrationModal");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
              break;
            default:
              this.errorMessage =
                "Email or password is invalid, please try again";
              break;
          }
        });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          return result.user.email;
        })
        .then((result) => {
          const user = {
            user: {
              email: result,
            },
          };

          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          };

          return fetch("https://exit-ticket-api.herokuapp.com/users", options);
        })
        .then((result) => result.json())
        .then((result) => {
          this.$store.commit("setCurrentUser", result);
          this.$store.commit("closeRegistrationModal");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
