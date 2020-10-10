import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/auth/login.vue";
import Register from "./components/auth/register.vue";
import Todo from "./components/todo.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/app", component: Todo },
];

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes,
});
