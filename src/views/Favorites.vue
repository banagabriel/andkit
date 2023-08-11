<script setup>
import PostList from "../components/PostList/PostList.vue";
import NotConnected from "../components/NotConnected/NotConnected.vue";
import SigninModal from "../components/SigninModal/SigninModal.vue";
</script>

<template>
  <template v-if="user">
    <PostList :posts="filteredPosts" />
  </template>
  <template v-else>
    <NotConnected :handleSignInModal="handleSignInModal"/>
  </template>
  <template v-if="signInModalOpen">
    <SigninModal
      :handleUsernameChange="handleUsernameChange"
      :handleSignInModal="handleSignInModal"
    />
  </template>
</template>

<script>
import axios from "axios";

export default {
  name: "Favorites",
  data() {
    return {
      posts: [],
      signInModalOpen: false,
      user: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData"))
        : null,
    };
  },
  methods: {
    handleSignInModal() {
      this.signInModalOpen = !this.signInModalOpen;
    },
    handleUsernameChange(username) {
      this.username = username;
    },
  },
  computed: {
    filteredPosts() {
      return this.posts
    },
  },
  async mounted () {
    if (!this.user) return;
    try {
      const response = await axios.get(
        `https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts?populate=*&pagination[page]=1&sort[0]=createdAt:desc&filters[favs][id][$eq]=${this.user.id}`
      );
      this.posts = response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>