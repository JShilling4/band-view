<template>
  <QSelect
    v-model="model"
    v-bind="$attrs"
    behavior="menu"
    clearable
    class="app-select-filter col"
  />
</template>

<script setup lang="ts">
const model = defineModel<unknown>({ required: true });
</script>

<style lang="scss" scoped>
#app .app-select-filter {
  max-width: 315px;
}
</style>
