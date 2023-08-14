<script setup>
import PostList from "../components/PostList/PostList.vue";
import NotConnected from "../components/NotConnected/NotConnected.vue";
import SigninModal from "../components/SigninModal/SigninModal.vue";
import globalContext from '../helpers/helpers'
</script>

<template>
  <template v-if="globalContext.user">
    <PostList :posts="posts" />
  </template>
  <template v-else>
    <NotConnected />
  </template>
  <template v-if="globalContext.signInModalOpen">
    <SigninModal />
  </template>
</template>

<script>
import axios from "axios";

export default {
  name: "Favorites",
  data() {
    return {
      posts: [],
      user: globalContext.user
    };
  },
  async mounted() {
    if (!this.user) return;
    try {
      const response = await axios.get(
        `https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts?populate=*&pagination[page]=1&sort[0]=createdAt:desc&filters[favs][id][$eq]=${this.user.id}`
      );
      this.posts = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
