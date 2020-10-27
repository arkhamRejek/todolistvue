const state = {
  token: localStorage.getItem("token"),
};

const getters = {};

const actions = {
  init(state) {
    console.log("hello from app store setting tokens");
    const token = localStorage.getItem("token");

    state.token = token;

    if (token) {
      this.$axios.defaults.headers["authorization"] = `Bearer ${token}`;
    } else if (this.$route.name !== "login") {
      this.$router.push({ name: "login" });
    }
  },
};

const mutations = {};

export const app = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
