<template>
  <h2 class="h2"><slot /></h2>
</template>

<script setup lang="ts">
interface PropTypes {
  pageTitle?: string;
}

withDefaults(defineProps<PropTypes>(), {
  pageTitle: "New Page",
});
</script>

<style lang="scss" scoped>
.h2 {
  margin-bottom: 10px;
}
</style>
