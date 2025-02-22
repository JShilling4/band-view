<template>
  <h2 class="h2 page-title">
    <slot>{{ pageTitle }}</slot>
  </h2>
</template>

<script setup lang="ts">
const { pageTitle = "New Page" } = defineProps<{ pageTitle?: string }>();
</script>
