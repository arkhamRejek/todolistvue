<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store);
    this.$store.dispatch("app/init");
  },
};
</script>
