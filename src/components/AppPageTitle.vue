<template>
  <h2 class="h2"><slot /></h2>
</template>

<script setup lang="ts">
defineProps<{
  pageTitle: string;
}>();
</script>

<style lang="scss" scoped></style>
