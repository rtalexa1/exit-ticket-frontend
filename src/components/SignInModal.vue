<template>
  <div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <input type="text" placeholder="Type your email" v-model="email" />
    <input
      type="password"
      placeholder="Type your password"
      v-model="password"
    />
    <button @click="signIn" class="blue-btn">Submit</button>
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
    },
  },
};
</script>

<style></style>
