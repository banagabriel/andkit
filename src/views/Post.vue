<script setup>
import EditModal from "../components/EditModal/EditModal.vue";
import FavoriteButton from "../components/FavoriteButton/FavoriteButton.vue";
</script>

<template>
  <article
    v-if="!!post"
    class="max-w-[680px] mx-auto w-full text-center text-[#161c2d] pb-[60px]"
  >
    <h1 class="text-[#161c2d] mb-[23px]">{{ post.attributes.Title }}</h1>
    <h2 class="text-[#506690] mb-[65px]">
      As part of our ongoing effort to enhance the traveler journey, we’re proud
      to partner with Portland International Airport (PDX) on the launch of a
      pilot program designed to shorten rider wait times at pickup.
    </h2>
    <div class="flex justify-between mb-[75px]">
      <div class="flex items-center gap-[12px]">
        <img
          class="h-[36px] w-[36px] rounded-full"
          src="../assets/example-photo.png"
          alt=""
        />
        <div class="flex flex-col text-[#506690] text-[12px] leading-[14px]">
          <p
            v-if="!!post.attributes.author.data"
            class="text-left flex w-fit uppercase text-[#161c2d] mb-[4px]"
          >
            {{ post.attributes.author.data.attributes.username }}
          </p>
          <span class="text-[#506690] opacity-[70%] text-left block w-fit">{{
            "Published on " + formatDate(post.attributes.createdAt)
          }}</span>
        </div>
        <div class="flex w-[80px] gap-[20px]">
          <button
          v-if="isEditable"
          :class="[
            isEditable
            ? `bg-[url('./assets/pencil-color.png')]`
            : `bg-[url('./assets/pencil.png')]`,
            'hover:border-transparent bg-no-repeat bg-transparent bg-cover disabled:opacity-75 disabled:hover:border-transparent h-[16px] w-[16px] p-0',
          ]"
            :key="isEditable"
            v-on:click="handleOpenEditModal()"
            ></button>
          </div>
        </div>
      <div class="flex items-center">
        <FavoriteButton
          :user="user"
          :post="post"
          :isFavorite="isFavorite"
          :handleIsFavoriteChange="handleIsFavoriteChange"
        />
        <p class="ml-[17px] text-[#869abb] opacity-[70%] uppercase mr-[17px]">Share:</p>
        <div class="flex gap-[19px] items-center">
          <a
            href=""
            class="block h-[21px] w-[21px] bg-[url(./assets/Vector.png)] bg-no-repeat bg-center bg-contain"
          ></a>
          <a
            href=""
            class="block h-[21px] w-[21px] bg-[url(./assets/Vector-2.png)] bg-no-repeat bg-center bg-contain"
          ></a>
          <a
            href=""
            class="block h-[21px] w-[21px] bg-[url(./assets/Vector-1.png)] bg-no-repeat bg-center bg-contain"
          ></a>
        </div>
      </div>
    </div>
    <div class="mb-[66px]">
      <img class="rounded-[5px] mb-[15px]" :src="post.attributes.banner.data.attributes.url" alt="this is a post image">
      <p class="text-[#869abb] opacity-[70%]">This is a caption on this photo for reference</p>
    </div>
    <p class="text-left text-[17px] leading-[25px]">{{ post.attributes.Body }}</p>
  </article>
  <template v-if="openEditModal">
    <EditModal
      :openEditModal="openEditModal"
      :post="post"
      :handleOpenEditModal="handleOpenEditModal"
    />
  </template>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      post: null,
      isFavorite: false,
      isEditable: false,
      openEditModal: false,
      user: JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData"))
        : null,
    };
  },
  methods: {
    formatDate(date) {
      const options = { month: "short", day: "numeric", year: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    handleOpenEditModal() {
      this.openEditModal = !this.openEditModal;
    },
    handleIsFavoriteChange() {
      this.isFavorite = !this.isFavorite;
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        `https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts?populate=*&filters[slug][$eq]=${this.$router.currentRoute.value.params.slug}`
      );
      this.post = response.data.data[0];
    } catch (error) {
      console.log(error);
    }
    if (this.user && this.post.attributes.author.data.id === this.user.id) {
      this.isEditable = true;
    }
    this.post.attributes.favs.data.forEach((users) => {
      if (this.user && users.id === this.user.id) {
        this.isFavorite = true;
      }
    });
  },
};
</script>
