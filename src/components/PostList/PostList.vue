<script setup>
import PostPreview from '../PostPreview/PostPreview.vue';
defineProps({
  posts: Array,
});
</script>

<template>
  <section class="mx-auto grid grid-cols-3 gap-x-[40px] w-fit roudend-[5px]">
    <a
      class="decoration-none bg-white relative text-black font-[900] rounded-[5px]"
      v-for="post in posts"
      :key="post.id"
      :href="post.attributes.slug ? `/post/` + post.attributes.slug : null"
    >
      <PostPreview :post="post" />
    </a>
  </section>
</template>

<script>
export default {
  name: "App",
  data() {},
};
</script>
