<template>
  <q-drawer v-model="model" v-bind="$attrs">
    <template #mini>
      <slot name="mini" />
    </template>
    <slot />
  </q-drawer>
</template>

<script setup lang="ts">
const model = defineModel<boolean>({ required: true });
</script>

<style lang="sass" scoped>
:deep(.mini-icon)
  font-size: 1.5rem
  padding: 20px 0
</style>
