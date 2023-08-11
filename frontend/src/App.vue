<script setup>
import SignupModal from "./components/SignupModal/SignupModal.vue";
import SigninModal from "./components/SigninModal/SigninModal.vue";
import Header from "./components/Header/Header.vue";
</script>

<template>
  <Header
    :handleSignInModal="handleSignInModal"
    :handleSignUpModal="handleSignUpModal"
    :username="username"
  />
  <template v-if="signUpModalOpen">
    <SignupModal :handleSignUpModal="handleSignUpModal" />
  </template>
  <template v-if="signInModalOpen">
    <SigninModal
      :handleUsernameChange="handleUsernameChange"
      :handleSignInModal="handleSignInModal"
    />
  </template>
  <div :key="username">
    <main class="max-w-[1040px] w-full px-[20px] mx-auto font-[900]">
      <router-view />
    </main>
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
      localStorage.getItem("userData");
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
