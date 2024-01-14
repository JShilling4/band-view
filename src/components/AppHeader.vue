<template>
  <q-header elevated class="bg-grey-10 text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title> Band Center </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  // toggleRightDrawer: [];
  toggleLeftDrawer: [];
}>();
</script>

<style lang="scss" scoped>
.left-menu-toggle {
  visibility: hidden;
}
</style>
