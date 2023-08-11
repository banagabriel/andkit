<script setup>
import PostList from "../components/PostList/PostList.vue";
import SearchBar from "../components/SearchBar/SearchBar.vue";
import NotFound from "../components/NotFound/NotFound.vue";
</script>

<template>
  <SearchBar :filteredPosts="filteredPosts" :handleSearchInput="handleSearchInput" />
  <template v-if="!filteredPosts.length">
    <NotFound :handleEmptySearchInput="handleEmptySearchInput"/>
  </template>
  <template v-else>
    <PostList :posts="filteredPosts" />
  </template>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      posts: [],
      searchInput: "",
    };
  },
  methods: {
    handleSearchInput(e) {
      this.searchInput = e.target.value;
    },
    handleEmptySearchInput() {
      this.searchInput = "";
    },
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return post.attributes.Title.toLowerCase().includes(
          this.searchInput.toLowerCase()
        );
      });
    },
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
