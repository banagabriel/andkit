<script setup>
import globalContext from "../../helpers/helpers";
</script>

<template>
  <header
    class="fixed flex items-center justify-between z-[100] top-0 left-0 w-full bg-[#FFFFFF] py-[10px] px-[30px]"
  >
    <a href="/">
      <img src="../../assets/logo.png" alt="Company Logo" />
    </a>
    <div class="flex h-fit gap-[20px]">
      <a
        :class="[
          globalContext.route === '/' ? 'text-[#335EEA]' : 'text-[#506690]',
          'block h-fit font-[900]',
        ]"
        href="/"
      >
        Articles
      </a>
      <a
        :class="[
          globalContext.route === '/favorites'
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
        :class="[
          !globalContext.username ? 'block' : 'hidden',
          'bg-transparent border-none text-[#506690] font-[900]',
        ]"
        v-on:click="globalContext.handleSignInModal()"
      >
        Login
      </button>
      <a
        :class="[
          !globalContext.username ? 'hidden' : 'block',
          globalContext.route === '/create' ? 'text-[#335EEA]' : 'text-[#506690]',
          'bg-transparent border-none font-[900]',
        ]"
        href="/create"
      >
        Create a post
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>
