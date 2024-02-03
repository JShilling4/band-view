<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
    <div class="page-content"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pageTitle: string;
}>();
</script>

<style lang="sass" scoped></style>
