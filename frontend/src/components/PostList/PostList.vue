<template>
  <section class="grid grid-cols-3 flex-wrap gap-[20px] w-fit">
    <a
      class="text-[#fff] decoration-none bg-[#494949] px-[40px] py-[20px] max-w-[350px]"
      v-for="post in posts"
      :key="post.id"
      :href="post.attributes.slug ? `/post/` + post.attributes.slug : null"
    >
      <div class="flex justify-between">
        <span class="text-left block w-full mb-[20px]">{{
          post.attributes.createdAt.split("T")[0]
        }}</span>
        <span
          v-if="!!post.attributes.author.data"
          class="text-left block w-fit mb-[20px]"
          >{{ post.attributes.author.data.attributes.username }}</span
        >
      </div>
      <h1 class="text-left text-[24px] mb-[20px]">
        {{ post.attributes.Title }}
      </h1>
      <p class="text-left text-[16px]">{{ post.attributes.Body.substring(0, 200) + '...' }}</p>
    </a>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/posts?populate=*&pagination[page]=1&sort[0]=createdAt:desc"
      );
      this.posts = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
