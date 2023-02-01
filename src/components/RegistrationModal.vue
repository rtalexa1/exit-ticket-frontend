<template>
  <div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="register" class="blue-btn">Submit</button>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          console.log("Successfully registered!");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
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

<style></style>
