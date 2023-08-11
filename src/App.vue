<script setup>
import SigninModal from "./components/SigninModal/SigninModal.vue";
import Header from "./components/Header/Header.vue";
</script>

<template>
  <Header
    :handleSignInModal="handleSignInModal"
    :handleSignUpModal="handleSignUpModal"
    :username="username"
  />
  <template v-if="signInModalOpen">
    <SigninModal
      :handleUsernameChange="handleUsernameChange"
      :handleSignInModal="handleSignInModal"
    />
  </template>
  <main :key="username" class="max-w-[1040px] w-full px-[20px] mx-auto font-[900]">
    <router-view />
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      signInModalOpen: false,
      username: localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData")).username
        : null,
    };
  },
  watch: {
    username() {
      localStorage.getItem("userData");
    },
  },
  methods: {
    handleSignInModal() {
      this.signInModalOpen = !this.signInModalOpen;
    },
    handleUsernameChange(username) {
      this.username = username;
    },
  },
};
</script>
