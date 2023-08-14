<script setup>
import globalContext from "../helpers/helpers";
</script>

<template>
  <section
    class="text-[#506690] flex flex-col items-center max-w-[500px] mx-auto pb-[100px]"
  >
    <h1 class="text-[45px] text-center w-full mb-[25px]">Create Post</h1>
    <div class="max-w-[500px] max-h-[400px]">
      <img
        class="object-cover rounded-[5px] mb-[15px]"
        v-if="!!globalContext.postInformation.banner"
        :src="globalContext.postInformation.banner.url"
        :alt="globalContext.postInformation.banner.name"
      />
      <img
        v-else
        class="object-cover rounded-[5px] mb-[15px]"
        src="../assets/placeholder-image.png"
        alt="Blog image placeholder"
      />
    </div>
    <form class="flex flex-col items-center w-full gap-[20px]">
      <div class="flex flex-col w-full items-center">
        <label
          class="flex items-center justify-center p-[10px] rounded-[5px] w-[150px] bg-[#335eea] text-white font-[900] text-[17px] leading-[25px]"
          for="post-image"
          >{{
            globalContext.postInformation.banner
              ? globalContext.postInformation.banner.name
              : "Upload an image"
          }}</label
        >
        <input
          id="post-image"
          type="file"
          name="files"
          class="hidden"
          v-on:change="globalContext.handleFileUpload($event)"
        />
      </div>
      <div class="flex flex-col w-full">
        <label
          class="text-[30px] leading-[30px] text-center w-full mb-[15px]"
          for="title"
          >Title</label
        >
        <input
          type="text"
          id="title"
          class="w-full block rounded-[5px] bg-white min-h-[40px]"
          v-on:keyup="globalContext.handlePostInformationChange($event)"
        />
      </div>
      <div class="flex flex-col w-full">
        <label
          class="text-[30px] leading-[30px] text-center w-full mb-[15px]"
          for="title"
          >Body</label
        >
        <textarea
          id="body"
          class="w-full block rounded-[5px] bg-white min-h-[200px]"
          v-on:keyup="globalContext.handlePostInformationChange($event)"
        ></textarea>
      </div>
      <button
        class="flex items-center justify-center p-[10px] rounded-[5px] w-[150px] bg-[#335eea] text-white font-[900] text-[17px] leading-[25px]"
        v-on:click="globalContext.createPost($event, router)"
      >
        Create!
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      router: this.$router
    };
  },
  beforeMount() {
    if (!globalContext.postInformation.author) {
      this.$router.push("/");
    }
  },
};
</script>
