<template>
  <q-drawer v-model="model" v-bind="$attrs" :mini="miniState">
    <template v-slot:mini>
      <slot name="mini" />
    </template>
    <slot />
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const model = defineModel<boolean>({ required: true });

const miniState = ref(true);
</script>

<style lang="scss" scoped>
:deep(.mini-icon) {
  font-size: 1.5rem;
  padding: 20px 0;
}
</style>
