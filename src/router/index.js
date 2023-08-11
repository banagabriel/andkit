import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Post from "../views/Post.vue"
import CreatePost from '../views/CreatePost.vue'
import Favorites from '../views/Favorites.vue'

const routes = [
  { path: "/", component: Home },
  { path: "/post/:slug", component: Post },
  { path: "/create", component: CreatePost },
  { path: "/favorites", component: Favorites },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;