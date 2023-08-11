<script setup>
defineProps({
  handleSignUpModal: Function,
});
</script>

<template>
  <div
    class="fixed z-[9999] bg-[#161c2d40] top-0 left-0 h-full w-full flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    aria-live="assertive"
    aria-labelledby="modal-title"
  >
    <div class="relative flex flex-row text-[#6e84a3] rounded-[5px] bg-white">
      <img class="block bg-cover" src="../../assets/people.png" alt="" />
      <div class="pt-[57px] mr-[50px] pb-[36px] ml-[68px] w-[295px]">
        <h1 class="text-[31px] text-[#161c2d] text-center w-full mb-[10px]">
          Sign Up
        </h1>
        <h2 class="text-[17px] text-center mb-[10px]">
          Simplify your reading in minutes.
        </h2>
        <div class="flex flex-col mb-[15px]" v-for="input in newUserForm">
          <input
            class="rounded-[6px] bg-transparent border-[1px] h-[50px] px-[20px] py-[14px]"
            v-on:keyup="updateFields($event)"
            :type="input.type"
            :placeholder="input.placeholder"
            :id="input.label"
          />
        </div>
        <button
          class="rounded-[5px] py-[10px] mb-[20px] w-full bg-[#335eea] text-white"
          v-on:click="createUser()"
        >
          Sign Up
        </button>
        <span
          class="absolute bg-[url(./assets/x.png)] bg-no-repeat bg-contain bg-center top-[19px] right-[22px] w-[10px] h-[10px] cursor-pointer"
          v-on:click="handleSignUpModal()"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      newUserForm: {
        username: {
          type: "text",
          label: "username",
          placeholder: "Your username",
          value: null,
        },
        email: {
          type: "email",
          label: "email",
          placeholder: "Your email",
          value: null,
        },
        password: {
          type: "password",
          label: "password",
          placeholder: "Your password",
          value: null,
        },
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await axios.post(
          "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/users",
          {
            username: this.newUserForm.username.value,
            email: this.newUserForm.email.value,
            password: this.newUserForm.password.value,
            role: 1,
          }
        );
        this.handleSignUpModal();
      } catch (error) {
        this.error(error);
      }
    },
    updateFields(e) {
      this.newUserForm[e.target.id].value = e.target.value;
    },
  },
};
</script>
