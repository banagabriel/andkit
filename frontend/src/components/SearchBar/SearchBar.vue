<script setup>
defineProps({
  handleSearchInput: Function
})
</script>

<template>
  <div class="w-full mb-[50px] ">
    <input
      class="w-full p-[10px] pl-[45px] bg-[#ffffff] rounded-[6px] text-black"
      type="text"
      placeholder="Search"
      v-on:keyup="handleSearchInput($event)"
    />
  </div>
</template>