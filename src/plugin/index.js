import Vue from "vue";
import axios from "axios";

// allows us to use this.$axios in our vue component pages
Vue.prototype.$axios = axios.create();
