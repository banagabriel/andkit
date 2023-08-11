<script setup>
defineProps({
  post: Object,
  user: Object,
  isFavorite: Boolean,
  handleIsFavoriteChange: Function,
  handleSignUpModal: Function,
  signUpModalOpen: Boolean,
});
</script>

<template>
  <button
    :class="[
      isFavorite
        ? `bg-[url('./assets/fav.png')]`
        : `bg-[url('./assets/unfav.png')]`,
      'hover:border-transparent bg-no-repeat bg-transparent bg-cover disabled:opacity-75 disabled:hover:border-transparent h-[16px] w-[16px] p-0',
    ]"
    :key="isFavorite"
    v-on:click="handleFavoriteChange($event)"
  ></button>
</template>

<script>
import axios from 'axios';

export default {
  name: "FavoriteButton",
  methods: {
    handleFavoriteChange (event) {
      event.preventDefault();
      if (!this.user) return this.handleSignUpModal()
      this.isFavorite ? unfav() : fav()
    },
    async fav(event) {
      event.preventDefault();
      try {
        await axios.put(`https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts/${this.post.id}`, {
          data: {
            favs: {
              connect: [{ id: this.user.id }],
            },
          },
        });
        this.handleIsFavoriteChange()
      } catch (error) {
        console.log(error);
      }
    },
    async unfav(event) {
      event.preventDefault();
      try {
        await axios.put(`https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts/${this.post.id}`, {
          data: {
            favs: {
              disconnect: [{ id: this.user.id }],
            },
          },
        });
        this.handleIsFavoriteChange()
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
