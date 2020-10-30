import Vue from "vue";
import Vuex from "vuex";
import { app } from "./app";
import { user } from "./user";
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    app,
    user,
  },
});
