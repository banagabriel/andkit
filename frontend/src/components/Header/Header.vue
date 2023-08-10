<script setup>
defineProps({
  handleSignUpModal: Function,
  handleSignInModal: Function,
  username: String,
});
</script>

<template>
  <header
    class="fixed flex items-center justify-between top-0 left-0 w-full bg-[#FFFFFF] py-[10px] px-[30px]"
  >
    <a href="">
      <img src="../../assets/logo.png" alt="Company Logo" />
    </a>
    <div class="flex h-fit gap-[20px]">
      <a
        :class="[
          route === '/' ? 'text-[#335EEA]' : 'text-[#506690]',
          'block h-fit font-[900]',
        ]"
        href="/"
      >
        Articles
      </a>
      <a
        :class="[
          route === '/favorites'
            ? 'text-[#335EEA]'
            : 'text-[#506690]',
          'block h-fit font-[900]',
        ]"
        href="/favorites"
      >
        Favorites
      </a>
    </div>
    <div class="flex gap-[20px]">
      <button
        :class="[!username ? null : 'opacity-0']"
        v-on:click="handleSignInModal()"
      >
        Login
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      route: window.location.pathname,
    };
  },
};
</script>
