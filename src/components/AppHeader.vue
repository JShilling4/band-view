<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="fa-solid fa-bars"
        @click="$emit('toggleLeftDrawer')"
      />

      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Band Center
      </q-toolbar-title>

      <q-btn
        dense
        flat
        round
        icon="fa-solid fa-gear"
        @click="$emit('toggleRightDrawer')"
      />
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/setlists" label="Setlists" />
      <q-route-tab to="/songs" label="Songs" />
      <q-route-tab to="/sets" label="Sets" />
    </q-tabs>
  </q-header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  toggleRightDrawer: [];
  toggleLeftDrawer: [];
}>();
</script>

<style lang="scss" scoped></style>
