<script setup></script>

<template>
  <section>
    <h1>Create Post</h1>
    <img
      v-if="!!postInformation.banner"
      :src="postInformation.banner.url"
      :alt="postInformation.banner.name"
    />
    <form class="flex flex-col items-center gap-[20px]">
      <input
        id="post-image"
        type="file"
        name="files"
        v-on:change="handleFileUpload($event)"
      />
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        v-on:keyup="handlePostInformationChange($event)"
      />
      <label for="title">Body</label>
      <textarea
        id="body"
        v-on:keyup="handlePostInformationChange($event)"
      ></textarea>

      <button v-on:click="createPost($event)">
        Create!
      </button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      files: null,
      isCreatingPost: false,
      isUploadingBanner: false,
      postInformation: {
        title: null,
        body: null,
        banner: null,
        author: JSON.parse(localStorage.getItem("userData"))
          ? JSON.parse(localStorage.getItem("userData")).id
          : null,
      },
    };
  },
  methods: {
    handlePostInformationChange(e) {
      this.postInformation[e.target.id] = e.target.value;
    },
    async handleFileUpload(e) {
      this.files = e.target.files;
      const formData = new FormData();
      formData.append("files", this.files[0]);
      const image = await axios.post(
        "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/upload",
        formData
      );
      this.postInformation.banner = image.data[0];
    },
    async createPost(e) {
      e.preventDefault()
      try {
        await axios.post("https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts", {
          data: {
            Title: this.postInformation.title,
            Body: this.postInformation.body,
            banner: this.postInformation.banner,
            author: this.postInformation.author,
            slug: this.postInformation.title.toLowerCase().replaceAll(' ', '-'),
            favs: { connect: [{ id: this.postInformation.author }] }
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  beforeMount() {
    if (!this.postInformation.author) {
      this.$router.push('/');
    }
  },
};
</script>
