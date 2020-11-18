import Vue from "vue";
import axios from "axios";

// allows us to use this.$axios in our vue component pages

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    const refreshToken = localStorage.getItem("refreshToken");
    const originalRequest = response.config;

    if (response.status === 401 && refreshToken) {
      try {
        console.log("trying to refresh");
        const { data } = await axios.post("/api/refresh", {
          token: refreshToken,
        });

        console.log("hey this is data", data);
        console.log("we should get a valid token back", data.accessToken);

        instance.defaults.headers[
          "authorization"
        ] = `Bearer ${data.accessToken}`;
        originalRequest.headers["authorization"] = `Bearer ${data.accessToken}`;
        console.log(originalRequest);
        const response = await axios(originalRequest);
        return response;
      } catch (e) {
        return Promise.reject(response);
      }
    }

    return Promise.reject(response);
  }
);

Vue.prototype.$axios = instance;
