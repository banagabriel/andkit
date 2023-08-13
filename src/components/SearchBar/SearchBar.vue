<script setup>
import globalContext from "../../helpers/helpers";
defineProps({
  filteredPosts: Array,
});
</script>

<template>
  <div
    class="relative flex justify-between w-full pl-[45px] p-[10px] bg-[#ffffff] rounded-[6px] gap-[5px] mb-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
  >
    <img
      class="absolute top-[22px] left-[18px] w-[19px] h-[19px]"
      src="../../assets/search.png"
      alt="Search magnifier"
    />
    <input
      class="w-[75%] bg-transparent text-black"
      type="text"
      placeholder="Search"
      v-on:keyup="globalContext.handleSearchInput($event)"
      v-on:keyup.enter="globalContext.handleSearch()"
    />
    <div class="flex items-center w-fit gap-[20px]">
      <p class="text-[#869ab8] uppercase text-[12px]">
        {{
          !filteredPosts.length
            ? "No results"
            : filteredPosts.length + " Results"
        }}
      </p>
      <button
        class="bg-[#335eea] text-white font-[900] text-[17px] leading-[25px]"
        v-on:click="globalContext.handleSearch()"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {};
  },
};
</script>
