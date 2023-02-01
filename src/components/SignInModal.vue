<template>
  <div class="modal-backdrop">
    <div class="modal">
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p><input type="text" placeholder="Type your email" v-model="email" /></p>
      <p>
        <input
          type="password"
          placeholder="Type your password"
          v-model="password"
        />
      </p>
      <button @click="signIn" class="blue-btn">Submit</button>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "SignInModal",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          console.log("Successfully signed in!");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errorMessage = "No account for that email";
              break;
            case "auth/wrong-password":
              this.errorMessage = "Incorrect password, please try again";
              break;
            default:
              this.errorMessage = "Email or password is incorrect";
              break;
          }
        });
      this.$store.commit("logUserIn");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15em;
  height: 10em;
  background: #fcfcfc;
}
</style>
