<script setup>
defineProps({
  handleSignUpModal: Function,
});
</script>

<template>
  <div
    class="fixed top-0 left-0 h-full w-full flex items-center justify-center"
    role="dialog"
    aria-modal="true"
    aria-live="assertive"
    aria-labelledby="modal-title"
  >
    <div class="flex flex-col bg-[#494949] p-[40px] rounded-[10px]">
      <div class="flex flex-col mb-[20px]" v-for="input in newUserForm">
        <label class="capitalize text-left mb-[5px]" for="email">{{
          input.label
        }}</label>
        <input
          class="rounded-[5px] px-[10px] py-[5px]"
          v-on:keyup="updateFields($event)"
          :type="input.type"
          :id="input.label"
        />
      </div>
      <button class="px-[10px] py-[5px] mb-[20px]" v-on:click="createUser()">
        Sign up
      </button>
      <button class="px-[10px] py-[5px]" v-on:click="handleSignUpModal()">
        Close
      </button>
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
          value: null,
        },
        email: {
          type: "email",
          label: "email",
          value: null,
        },
        password: {
          type: "password",
          label: "password",
          value: null,
        },
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await axios.post("http://localhost:1337/api/users", {
          username: this.newUserForm.username.value,
          email: this.newUserForm.email.value,
          password: this.newUserForm.password.value,
          role: 1,
        });
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
