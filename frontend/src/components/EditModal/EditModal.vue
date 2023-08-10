<script setup>
defineProps({
  post: Object,
  handleOpenEditModal: Function,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 h-full w-full flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    aria-live="assertive"
    aria-labelledby="modal-title"
  >
    <div class="flex flex-col bg-[#494949] p-[40px] rounded-[10px] w-[500px]">
      <div class="flex flex-col mb-[20px]">
        <label class="capitalize text-left mb-[5px]" for="title">Title</label>
        <input
          class="rounded-[5px] px-[10px] py-[5px]"
          type="text"
          v-on:keydown="handleTitleChange($event)"
          id="title"
        />
        <label class="capitalize text-left mb-[5px]" for="body">Body</label>
        <textarea
          class="rounded-[5px] px-[10px] py-[5px]"
          type="text-area"
          v-on:keydown="handleBodyChange($event)"
          id="body"
        ></textarea>
      </div>
      <button
        class="px-[10px] py-[5px] mb-[20px] max-w-[200px] w-full mx-auto"
        v-on:click="handleEditPost()"
      >
        Edit
      </button>
      <button
        class="px-[10px] py-[5px] max-w-[200px] w-full mx-auto"
        v-on:click="handleOpenEditModal()"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditModal",
  data() {
    return {
      newTitle: null,
      newBody: null,
    };
  },
  methods: {
    handleTitleChange(e) {
      this.newTitle = e.target.value;
    },
    handleBodyChange(e) {
      this.newBody = e.target.value;
    },
    async handleEditPost() {
      try {
        await axios.put(`http://localhost:1337/api/posts/${this.post.id}`, {
          data: {
            Title: !this.newTitle ? this.post.attributes.Title : this.newTitle,
            Body: !this.newBody ? this.post.attributes.Title : this.newBody,
          },
        });
        this.isFavorite = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
