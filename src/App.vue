<script setup>
import SigninModal from "./components/SigninModal/SigninModal.vue";
import Header from "./components/Header/Header.vue";
import SignupModal from "./components/SignupModal/SignupModal.vue";
import globalContext from "./helpers/helpers";
</script>

<template>
  <Header :username="globalContext.username" />
  <template v-if="globalContext.signInModalOpen">
    <SigninModal />
  </template>
  <template v-if="globalContext.signUpModalOpen">
    <SignupModal :handleSignUpModal="globalContext.handleSignUpModal" />
  </template>
  <main
    :key="globalContext.username"
    class="max-w-[1040px] w-full px-[20px] mx-auto font-[900]"
  >
    <router-view />
  </main>
</template>

<script>
export default {
  name: "App",
  data() { return {} }
};
</script>
