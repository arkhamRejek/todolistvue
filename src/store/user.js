import Vue from "vue"; // import vue because
import { router } from "../routes";

const state = {
  token: localStorage.getItem("token"),
};

const getters = {};

const actions = {
  init({ commit }) {
    const token = localStorage.getItem("token");

    if (token) {
      commit("setToken", token);
    } else if (router.currentRoute.name !== "login") {
      router.push({ name: "login" });
    }
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
};

const mutations = {
  setToken(state, arg) {
    state.token = arg;
    // this.$axios or the "this" instance is not available in the stores
    // once we obtain the token we set the authorization to send back to our server
    Vue.prototype.$axios.defaults.headers["authorization"] = `Bearer ${arg}`;
  },
};

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
