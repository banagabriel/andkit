<script setup>
import globalContext from "../../helpers/helpers";
defineProps({
  post: Object,
  handleIsFavoriteChange: Function,
  isFavorite: Boolean,
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
    v-on:click="
      globalContext.handleFavoriteChange(
        $event,
        post,
        handleIsFavoriteChange,
        isFavorite
      )
    "
  ></button>
</template>

<script>
export default {
  name: "FavoriteButton",
};
</script>
