<template>
  <form @submit.prevent class="p-4 shadow">
    <h3>Register</h3>

    <div class="row mt-3">
      <div class="col-6">
        <input
          type="text"
          v-model="form.first_name"
          class="form-control"
          placeholder="enter first name"
        />
      </div>
      <div class="col-6 ">
        <input
          type="text"
          v-model="form.last_name"
          class="form-control"
          placeholder="enter last name"
        />
      </div>

      <div class="col-6 mt-3">
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          placeholder="enter email"
        />
      </div>

      <div class="col-6 mt-3">
        <input
          type="number"
          v-model="form.age"
          class="form-control"
          placeholder="enter  age"
        />
      </div>

      <div class="col-6 mt-3">
        <input
          type="password"
          v-model="form.password"
          class="form-control"
          placeholder="enter a password"
        />
      </div>

      <div class="col-6 mt-3">
        <input
          type="password"
          v-model="form.passwordConfirmation"
          class="form-control"
          placeholder="re-enter password"
        />
      </div>
    </div>

    <button
      type="button"
      class="btn btn-primary mt-4 w-100"
      @click="createUser"
    >
      save
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      route: "/api/register",
    };
  },
  methods: {
    createUser() {
      this.$axios
        .post(this.route, this.form)
        .then(() => {
          console.log("success");
          this.$router.push({ name: "login" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
