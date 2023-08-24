<script setup lang="ts">
import AppTopbar from "./components/AppTopbar.vue";
</script>

<template>
  <div>
    <app-topbar />
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
</style>
