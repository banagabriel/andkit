<script setup>
import PostList from "../components/PostList/PostList.vue";
import NotConnected from "../components/NotConnected/NotConnected.vue";
import SigninModal from "../components/SigninModal/SigninModal.vue";
import SearchBar from "../components/SearchBar/SearchBar.vue";
import globalContext from "../helpers/helpers";
</script>

<template>
  <SearchBar :filteredPosts="filteredPosts" />
  <template v-if="globalContext.user">
    <PostList :posts="filteredPosts" />
  </template>
  <template v-else>
    <NotConnected />
  </template>
  <template v-if="globalContext.signInModalOpen">
    <SigninModal />
  </template>
</template>

<script>
export default {
  name: "Favorites",
  data() {
    return {};
  },
  computed: {
    filteredPosts() {
      return globalContext.favoritesPosts.filter((post) => {
        return post.attributes.Title.toLowerCase().includes(
          globalContext.search.toLowerCase()
        );
      });
    },
  },
  async mounted() {
    await globalContext.getFavoritePosts();
  },
};
</script>
