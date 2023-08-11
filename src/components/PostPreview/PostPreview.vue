<script setup>
import FavoriteButton from "../FavoriteButton/FavoriteButton.vue";
defineProps({
  post: Object,
  signUpModalOpen: Boolean,
  handleSignUpModal: Function,
});
</script>

<template>
  <div
    class="absolute z-10 flex items-center justify-between top-[21px] right-[13px] w-[90%]"
  >
    <span
      class="block bg-[#42BA96] font-[900] rounded-full text-white px-[10px] py-[5px] text-[12px] leading-[14px]">
      $49/MO
    </span>
    <FavoriteButton
      :post="post"
      :user="user"
      :signUpModalOpen="signUpModalOpen"
      :handleSignUpModal="handleSignUpModal"
      :isFavorite="isFavorite"
      :handleIsFavoriteChange="handleIsFavoriteChange"
    />
  </div>
  <div class="post-image-container mb-[31px] rounded-[5px]">
    <img
      class="w-full h-[200px] object-cover mb-[20px] rounded-[5px]"
      :src="post.attributes.banner.data.attributes.url
      "
      alt="Post Image"
    />
  </div>
  <div class="flex flex-col px-[26px] pb-[26px]">
    <h1 class="text-left text-[#161B2D] text-[21px] leading-[28px] mb-[10px]">
      {{ post.attributes.Title }}
    </h1>
    <p
      class="text-left min-h-[82px] text-[#6B7C93] font-[400] text-[16px] pb-[32px] mb-[15px] border-b-[2px]"
    >
      {{ post.attributes.Body.substring(0, 60) + "..." }}
    </p>
    <div class="text-[#6b7c93] flex flex-row-reverse justify-between w-full">
      <p class="text-left block w-fit">
        {{ formatDate(post.attributes.createdAt) }}
      </p>
      <p v-if="!!post.attributes.author.data" class="text-left block w-fit">
        {{ post.attributes.author.data.attributes.username }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isFavorite: false,
      user: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData"))
        : null,
    };
  },
  methods: {
    handleIsFavoriteChange() {
      this.isFavorite = !this.isFavorite;
    },
    formatDate(date) {
      const options = { month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  async mounted() {
    this.post.attributes.favs.data.forEach((users) => {
      if (this.user && users.id === this.user.id) {
        this.isFavorite = true;
      }
    });
  },
};
</script>
