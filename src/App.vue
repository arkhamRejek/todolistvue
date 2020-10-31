<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("app/init");
  },
};
</script>
