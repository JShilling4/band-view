<template>
  <div class="page-container">
    <AppPageTitle>{{ pageTitle }}</AppPageTitle>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pageTitle: string;
}>();
</script>
