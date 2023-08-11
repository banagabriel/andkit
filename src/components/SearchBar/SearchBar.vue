<script setup>
defineProps({
  handleSearchInput: Function,
  filteredPosts: Array
})
</script>

<template>
  <div class="relative w-full mb-[50px] ">
    <input
      class="w-full p-[10px] pl-[45px] bg-[#ffffff] rounded-[6px] text-black"
      type="text"
      placeholder="Search"
      v-on:keyup="handleSearchInput($event)"
    />
    <div>
      <p>{{  }}</p>
      <button></button>
    </div>
  </div>
</template>