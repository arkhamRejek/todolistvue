<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    const token = localStorage.getItem("token");

    if (token) {
      this.$axios.defaults.headers["authorization"] = `Bearer ${token}`;
    } else {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
