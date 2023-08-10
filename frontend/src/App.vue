<script setup>
import SignupModal from "./components/SignupModal/SignupModal.vue";
import SigninModal from "./components/SigninModal/SigninModal.vue";
</script>

<template>
  <header
    class="fixed flex top-0 left-0 w-full bg-[#494949] py-[10px] px-[30px]"
  >
    <div v-if="!username" class="flex gap-[20px]">
      <button v-on:click="handleSignUpModal()">Sign up</button>
      <button v-on:click="handleSignInModal()">Sign in</button>
    </div>
    <div v-if="username">
      <p>{{ username }}</p>
    </div>
  </header>
  <template v-if="signUpModalOpen">
    <SignupModal :handleSignUpModal="handleSignUpModal"/>
  </template>
  <template v-if="signInModalOpen">
    <SigninModal
      :handleUsernameChange="handleUsernameChange"
      :handleSignInModal="handleSignInModal"
    />
  </template>
  <div :key="username">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      signUpModalOpen: false,
      signInModalOpen: false,
      username: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData")).username
        : null,
    };
  },
  watch: {
    username() {
      localStorage.getItem('userData')
    },
  },
  methods: {
    handleSignUpModal() {
      this.signUpModalOpen = !this.signUpModalOpen;
    },
    handleSignInModal() {
      this.signInModalOpen = !this.signInModalOpen;
    },
    handleUsernameChange(username) {
      this.username = username;
    },
  },
};
</script>