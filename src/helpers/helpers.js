import { reactive } from "vue";
import axios from "axios";

export default reactive({
  // State variables
  signInModalOpen: false,
  signUpModalOpen: false,
  isSearching: false,
  isCreatingPost: false,
  isUploadingBanner: false,
  openEditModal: false,
  files: null,
  newTitle: null,
  newBody: null,
  user: JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
  username: JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData")).username
    : null,
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
  route: window.location.pathname,
  searchInput: "",
  search: "",
  posts: [],
  postInformation: {
    title: null,
    body: null,
    banner: null,
    author: JSON.parse(localStorage.getItem("userData"))
      ? JSON.parse(localStorage.getItem("userData")).id
      : null,
  },

  // API calls
  async login() {
    try {
      const response = await axios.post(
        "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/auth/local",
        {
          identifier: this.newUserForm.email.value,
          password: this.newUserForm.password.value,
        }
      );
      const { jwt, user } = response.data;
      window.localStorage.setItem("jwt", jwt);
      window.localStorage.setItem("userData", JSON.stringify(user));
      this.handleUsernameChange(user.username);
      this.handleSignInModal();
    } catch (error) {
      console.log(error);
    }
  },

  async getPosts() {
    try {
      const response = await axios.get(
        "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts?populate=*&pagination[page]=1&sort[0]=createdAt:desc"
      );
      this.posts = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },

  async setFavorite(event, post, handleIsFavoriteChange) {
    event.preventDefault();
    try {
      await axios.put(
        `https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts/${post.id}`,
        {
          data: {
            favs: {
              connect: [{ id: this.user.id }],
            },
          },
        }
      );
      handleIsFavoriteChange();
    } catch (error) {
      console.log(error);
    }
  },

  async setUnfavorite(event, post, handleIsFavoriteChange) {
    event.preventDefault();
    try {
      await axios.put(
        `https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts/${post.id}`,
        {
          data: {
            favs: {
              disconnect: [{ id: this.user.id }],
            },
          },
        }
      );
      handleIsFavoriteChange();
    } catch (error) {
      console.log(error);
    }
  },

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
      console.log(error);
    }
  },

  async handleFileUpload(e) {
    this.files = e.target.files;
    const formData = new FormData();
    formData.append("files", this.files[0]);
    const image = await axios.post(
      "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/upload",
      formData
    );
    this.postInformation.banner = image.data[0];
  },

  async createPost(e, router) {
    e.preventDefault();
    try {
      await axios.post(
        "https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts",
        {
          data: {
            Title: this.postInformation.title,
            Body: this.postInformation.body,
            banner: this.postInformation.banner,
            author: this.postInformation.author,
            slug: this.postInformation.title.toLowerCase().replaceAll(" ", "-"),
            favs: { connect: [{ id: this.postInformation.author }] },
          },
        }
      );
      router.push({ path: "/" });
    } catch (error) {
      console.log(error);
    }
  },

  async handleEditPost(post) {
    try {
      await axios.put(`https://wise-dinosaur-ac425bf63d.strapiapp.com/api/posts/${post.id}`, {
        data: {
          Title: !this.newTitle ? post.attributes.Title : this.newTitle,
          Body: !this.newBody ? post.attributes.Title : this.newBody,
          slug: !this.newTitle ? post.attributes.Title : this.newTitle.toLowerCase().replaceAll(' ', '-')
        },
      });
      this.handleOpenEditModal()
    } catch (error) {
      console.log(error);
    }
  },

  // State changes
  updateFields(e) {
    this.newUserForm[e.target.id].value = e.target.value;
  },
  handlePostInformationChange(e) {
    this.postInformation[e.target.id] = e.target.value;
  },
  handleSignInModal() {
    this.signInModalOpen = !this.signInModalOpen;
  },
  handleUsernameChange(username) {
    this.username = username;
  },
  handleSearchInput(e) {
    if (!e.target.value.length) return (this.search = e.target.value);
    this.searchInput = e.target.value;
  },
  handleSearch() {
    this.search = this.searchInput;
  },
  handleEmptySearchInput() {
    this.searchInput = "";
  },
  handleSignUpModal() {
    this.signUpModalOpen = !this.signUpModalOpen;
  },
  handleFavoriteChange(event, post, handleIsFavoriteChange, isFavorite) {
    event.preventDefault();
    if (!this.user) return this.handleSignUpModal();
    isFavorite
      ? this.setUnfavorite(event, post, handleIsFavoriteChange)
      : this.setFavorite(event, post, handleIsFavoriteChange);
  },
  handleOpenEditModal() {
    this.openEditModal = !this.openEditModal;
  },
  handleTitleChange(e) {
    this.newTitle = e.target.value;
  },
  handleBodyChange(e) {
    this.newBody = e.target.value;
  },
});
