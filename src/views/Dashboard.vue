<template>
  <div class="page-container">
    <app-page-title>{{ pageTitle }}</app-page-title>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pageTitle: string;
}>();
</script>

<style lang="sass" scoped></style>
