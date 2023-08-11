<script setup>
defineProps({
  handleSignInModal: Function,
})
</script>

<template>
  <div class="flex items-center justify-between mt-[183px]">
    <div class="flex flex-col items-center text-center text-[#12263F] max-w-[311px]">
      <h1 class="mb-[20px]">Uh oh.</h1>
      <h2 class="text-[#6e84a3] mb-[20px]">Seems like you are not logged in!</h2>
      <button class="bg-[#335eea] text-white font-[900] text-[17px] leading-[25px]" v-on:click="handleSignInModal()">Login</button>
    </div>
    <div class="max-w-[590px] w-full max-h-[380px] h-full">
      <img class="object-cover w-full h-full" src="../../assets/not-found.png" alt="">
    </div>
  </div>
</template>