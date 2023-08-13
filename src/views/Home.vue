<script setup>
import PostList from "../components/PostList/PostList.vue";
import SearchBar from "../components/SearchBar/SearchBar.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import globalContext from "../helpers/helpers";
</script>

<template>
  <SearchBar :filteredPosts="filteredPosts" />
  <template v-if="!filteredPosts.length">
    <NotFound />
  </template>
  <template v-else>
    <PostList :posts="filteredPosts" />
  </template>
</template>

<script>
export default {
  name: "Home",
  computed: {
    filteredPosts() {
      return globalContext.posts.filter((post) => {
        return post.attributes.Title.toLowerCase().includes(
          globalContext.search.toLowerCase()
        );
      });
    },
  },
  async mounted() {
    await globalContext.getPosts();
  },
};
</script>
