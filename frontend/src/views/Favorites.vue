<script setup>
import PostList from "../components/PostList/PostList.vue";
</script>

<template>
  <PostList :posts="filteredPosts" />
</template>

<script>
import axios from "axios";

export default {
  name: "Favorites",
  data() {
    return {
      posts: [],
      user: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData"))
        : null,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts
    },
  },
  async mounted () {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/posts?populate=*&pagination[page]=1&sort[0]=createdAt:desc&filters[favs][id][$eq]=${this.user.id}`
      );
      this.posts = response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>