<template>
  <div id="container">
    <nav>logout</nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("app/init");
  },
  methods: {
    logout() {},
  },
};
</script>
