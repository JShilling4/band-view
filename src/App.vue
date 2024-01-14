<template>
  <q-layout view="hHh lpR fFf">
    <app-header
      @toggle-left-drawer="toggleLeftDrawer"
      @toggle-right-drawer="toggleRightDrawer"
    />

    <app-drawer v-model="leftDrawerOpen" bordered side="left">
      Left Drawer
    </app-drawer>

    <app-drawer v-model="rightDrawerOpen" bordered side="right">
      Right Drawer
    </app-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  &.heading {
    line-height: 1.5;
  }
}
ul {
  list-style: none;
}

// Quasar overrides
.q-btn {
  letter-spacing: 1px;
}
</style>
