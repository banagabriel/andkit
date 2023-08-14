<script setup>
import globalContext from "../../helpers/helpers";
defineProps({
  post: Object,
});
</script>

<template>
  <div
    class="fixed z-[9999] bg-[#161c2d40] top-0 left-0 h-full w-full flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    aria-live="assertive"
    aria-labelledby="modal-title"
  >
    <div
      class="relative flex flex-col text-[#6e84a3] rounded-[5px] bg-white py-[40px] px-[20px] max-w-[400px] w-full"
    >
      <div class="flex flex-col mb-[20px]">
        <label class="capitalize text-left mb-[5px]" for="title">Title</label>
        <input
          class="rounded-[6px] bg-transparent border-[1px] h-[50px] px-[20px] py-[14px]"
          type="text"
          v-on:keyup="globalContext.handleTitleChange($event)"
          id="title"
        />
        <label class="capitalize text-left mb-[5px]" for="body">Body</label>
        <textarea
          class="rounded-[6px] bg-transparent border-[1px] h-[50px] px-[20px] py-[14px]"
          type="text-area"
          v-on:keyup="globalContext.handleBodyChange($event)"
          id="body"
        ></textarea>
      </div>
      <button
        class="rounded-[5px] py-[10px] mb-[20px] w-full bg-[#335eea] text-white"
        v-on:click="globalContext.handleEditPost(post)"
      >
        Edit
      </button>
      <span
        class="absolute bg-[url(./assets/x.png)] bg-no-repeat bg-contain bg-center top-[19px] right-[22px] w-[10px] h-[10px] cursor-pointer"
        v-on:click="globalContext.handleOpenEditModal()"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditModal",
  data() {
    return {};
  },
};
</script>
