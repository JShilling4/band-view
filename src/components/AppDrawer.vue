<template>
  <q-drawer v-model="model" v-bind="$attrs">
    <slot></slot>
  </q-drawer>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
</script>

<style lang="scss" scoped></style>
