<template>
  <div class="ticket-creator-container">
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
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
          alert(error.message);
        });
    },
  },
};
</script>

<style></style>
