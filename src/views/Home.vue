<script setup>
import PostList from "../components/PostList/PostList.vue";
import SearchBar from "../components/SearchBar/SearchBar.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import SignupModal from "../components/SignupModal/SignupModal.vue";
</script>

<template>
  <SearchBar :filteredPosts="filteredPosts" :handleSearchInput="handleSearchInput" />
  <template v-if="!filteredPosts.length">
    <NotFound :handleEmptySearchInput="handleEmptySearchInput"/>
  </template>
  <template v-else>
    <PostList :handleSignUpModal="handleSignUpModal" :signUpModalOpen="signUpModalOpen" :posts="filteredPosts" />
  </template>
  <template v-if="signUpModalOpen">
    <SignupModal :handleSignUpModal="handleSignUpModal" />
  </template>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      posts: [],
      signUpModalOpen: false,
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
    handleSignUpModal() {
      this.signUpModalOpen = !this.signUpModalOpen;
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
        "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts?populate=*&pagination[page]=1&sort[0]=createdAt:desc"
      );
      this.posts = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
