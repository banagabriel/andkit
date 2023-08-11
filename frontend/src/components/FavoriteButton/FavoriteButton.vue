<script setup>
defineProps({
  post: Object,
  user: Object,
  isFavorite: Boolean,
  handleIsFavoriteChange: Function,
});
</script>

<template>
  <button
    :disabled="!user"
    :class="[
      isFavorite
        ? `bg-[url('./assets/fav.png')]`
        : `bg-[url('./assets/unfav.png')]`,
      'hover:border-transparent bg-no-repeat bg-transparent bg-cover disabled:opacity-75 disabled:hover:border-transparent h-[16px] w-[16px] p-0',
    ]"
    :key="isFavorite"
    v-on:click="isFavorite ? unfav($event) : fav($event)"
  ></button>
</template>

<script>
import axios from 'axios';

export default {
  name: "FavoriteButton",
  methods: {
    async fav(event) {
      event.preventDefault();
      try {
        await axios.put(`http://localhost:1337/api/posts/${this.post.id}`, {
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
        await axios.put(`http://localhost:1337/api/posts/${this.post.id}`, {
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
