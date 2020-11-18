<template>
  <form @submit.prevent class="p-4 shadow">
    <h3>Login</h3>

    <div class="row mt-3">
      <div class="col-12">
        <input
          type="text"
          v-model="form.email"
          class="form-control"
          placeholder="enter email"
        />
      </div>

      <div class="col-12 mt-3">
        <input
          type="password"
          v-model="form.password"
          class="form-control"
          placeholder="enter password"
        />
      </div>
    </div>

    <button type="button" class="btn btn-primary mt-4 w-100" @click="login">
      Login
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      form: {},
      route: "/api/login",
      state: this.$store.state.app,
    };
  },
  created() {
    if (this.token) {
      this.$router.push({ name: "app" });
    }
  },
  methods: {
    login() {
      this.$axios
        .post(this.route, this.form)
        .then(({ data }) => {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          this.$store.dispatch("app/setToken", data.accessToken);
          this.$router.push({ name: "app" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
