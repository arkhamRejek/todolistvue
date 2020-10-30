<template>
  <div id="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("vue instance", this);
    this.$store.dispatch("app/init");
  },
};
</script>
