<script setup>
import EditModal from "../components/EditModal/EditModal.vue";
</script>

<template>
  <div class="flex justify-center min-w-full flex-row-reverse gap-[80px]">
    <div class="flex w-[80px] gap-[20px]">
      <button
        :disabled="!user"
        :class="[
          isFavorite
            ? `bg-[url('./assets/lover.png')]`
            : `bg-[url('./assets/heart.png')]`,
          'hover:border-transparent bg-no-repeat bg-transparent bg-cover disabled:opacity-75 disabled:hover:border-transparent max-h-[30px] h-full w-full max-w-[30px] p-0',
        ]"
        :key="isFavorite"
        v-on:click="isFavorite ? unfav() : fav()"
      ></button>
      <button
        v-if="isEditable"
        :class="[
          isEditable
            ? `bg-[url('./assets/pencil-color.png')]`
            : `bg-[url('./assets/pencil.png')]`,
          'hover:border-transparent bg-no-repeat bg-transparent bg-cover disabled:opacity-75 disabled:hover:border-transparent max-h-[30px] h-full w-full max-w-[30px] p-0',
        ]"
        :key="isEditable"
        v-on:click="handleOpenEditModal()"
      ></button>
    </div>
    <article v-if="!!post" class="max-w-[700px] w-full text-left">
      <div class="flex justify-between">
        <span class="text-left block w-fit mb-[20px]">{{
          post.attributes.createdAt.split("T")[0]
        }}</span>
        <span
          v-if="!!post.attributes.author.data"
          class="text-left flex w-fit mb-[20px]"
          >Author: {{ post.attributes.author.data.attributes.username }}</span
        >
      </div>
      <h1>{{ post.attributes.Title }}</h1>
      <p>{{ post.attributes.Body }}</p>
    </article>
    <template v-if="openEditModal">
      <EditModal :openEditModal="openEditModal" :post="post" :handleOpenEditModal="handleOpenEditModal"/>
    </template>
  </div>
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
    handleOpenEditModal() {
      this.openEditModal = !this.openEditModal
    },
    async fav() {
      try {
        await axios.put(`http://localhost:1337/api/posts/${this.post.id}`, {
          data: {
            favs: {
              connect: [{ id: this.user.id }],
            },
          },
        });
        this.isFavorite = true;
      } catch (error) {
        console.log(error);
      }
    },
    async unfav() {
      try {
        await axios.put(`http://localhost:1337/api/posts/${this.post.id}`, {
          data: {
            favs: {
              disconnect: [{ id: this.user.id }],
            },
          },
        });
        this.isFavorite = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/posts?populate=*&filters[slug][$eq]=${this.$router.currentRoute.value.params.slug}`
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
