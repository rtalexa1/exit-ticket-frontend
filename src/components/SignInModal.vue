<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-x"
          @click="$store.commit('closeSignInModal')"
        />
      </div>
      <h2>Sign In</h2>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <p><input type="text" placeholder="Type your email" v-model="email" /></p>
      <p>
        <input
          type="password"
          placeholder="Type your password"
          v-model="password"
          style="margin-bottom: 5px"
        />
      </p>
      <button @click="signIn" class="blue-btn">Submit</button>
      <button @click="signInWithGoogle" class="blue-btn">
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInModal",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
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
  justify-content: flex-start;
  align-items: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: solid 1.5px #f2f2f2fc;
  border-radius: 5px;
  width: 18em;
  height: 18em;
  background: #fcfcfc;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 1em;
}

.icon {
  padding-right: 1em;
  cursor: pointer;
}

h2 {
  padding-bottom: 5px;
}

input {
  margin: 0.1em 0;
}
</style>
